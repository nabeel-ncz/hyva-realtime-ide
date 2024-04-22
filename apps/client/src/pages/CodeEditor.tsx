import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { SocketContext } from "../provider/SocketProvider";
import CodeKeyBindingSelector from "../components/CodeKeyBindingSelector";
import LanguageChanger from "../components/LanguageChanger";
import { generateColor } from "../utils/generate";
import { toast } from 'react-hot-toast';
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-typescript";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-css";

import "ace-builds/src-noconflict/keybinding-emacs";
import "ace-builds/src-noconflict/keybinding-vim";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-vibrant_ink";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/ext-searchbox";
import { apiClient } from "../utils/axios";
import SaveFileModal from "../components/SaveFileModal";
import useAxios from "../hooks/useAxios";

export default function CodeEditor() {

  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const { socket } = useContext(SocketContext);
  const [fetchedUsers, setFetchedUsers] = useState<string[]>([]);
  const [fetchedCode, setFetchedCode] = useState<string>("");
  const [language, setLanguage] = useState<string>("javascript");
  const [codeKeybinding, setCodeKeybinding] = useState<any>(undefined);
  const [saveFileOpen, setSaveFileOpen] = useState<boolean>(false);
  const { data: user } = useAxios({ url: '/auth', method: 'get' });
  const [output, setOutput] = useState<{
    out: string;
    loading: boolean;
    success: boolean;
  }>({
    out: '',
    loading: false,
    success: false
  });


  useEffect(() => {
    let saved = Boolean(searchParams.get('saved'));
    let _id = searchParams.get('_id');
    if (saved && _id) {
      apiClient.get(`/code/${_id}`, { withCredentials: true }).then((res) => {
        setFetchedCode(res.data?.content);
      });
    };
  }, []);

  const languagesAvailable: string[] = ["javascript", "java", "c_cpp", "python", "typescript", "golang", "yaml", "html"]
  const codeKeybindingsAvailable: string[] = ["default", "emacs", "vim"];

  function onChange(newValue: string) {
    setFetchedCode(newValue);
    socket.emit("update_code", { roomId: id, code: newValue });
    socket.emit("sync_code", { roomId: id });
  }

  function handleLanguageChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setLanguage(e.target.value)
    socket.emit("update_language", { roomId: id, languageUsed: e.target.value })
    socket.emit("sync_language", { roomId: id });
  }

  function handleCodeKeybindingChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setCodeKeybinding(e.target.value === "default" ? undefined : e.target.value)
  }

  function handleLeave() {
    socket.disconnect();
    !socket.connected && window.location.replace("/");
  }

  function copyToClipboard(text: string) {
    try {
      navigator.clipboard.writeText(text);
      toast.success('Room Id copied to clipboard', {
        position: 'top-right'
      });
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    socket.on("updating_client_list", ({ userslist }) => {
      setFetchedUsers(userslist)
    })

    socket.on("on_language_change", ({ languageUsed }) => {
      setLanguage(languageUsed)
    })

    socket.on("on_code_change", ({ code }) => {
      setFetchedCode(code)
    })

    socket.on("new_member_joined", ({ username }) => {
      toast(`${username} joined`, { position: "top-right" });
    })

    socket.on("member_left", ({ username }) => {
      toast(`${username} left`, { position: "top-right" });
    });

    const backButtonEventListner = window.addEventListener("popstate", function (e) {
      const eventStateObj = e.state
      if (!('usr' in eventStateObj) || !('username' in eventStateObj.usr)) {
        socket.disconnect()
      }
    });
    return () => {
      window.removeEventListener("popstate", backButtonEventListner as any);
    }
  }, [socket]);


  const handleSave = (title: string) => {
    if (!title || title.length < 4) {
      return toast.error('Title should contain atleast 4 characters', {
        position: 'top-right'
      });
    };
    apiClient.post('/code', {
      title: title,
      content: fetchedCode.length > 0 ? fetchedCode : "//Empty",
      userRef: user?._id
    }, { withCredentials: true }).then(() => {
      toast.success('Code saved successfully, Please check on saved files', {
        position: 'top-right'
      })
    }).catch(() => {
      toast.error('Something went wrong in saving code, Please try again', {
        position: 'top-right'
      });
    }).finally(() => {
      setSaveFileOpen(false);
    });
  };

  const handleRunCode = () => {
    setOutput((state) => ({
      ...state,
      loading: true
    }));
    apiClient.post('/run-code', {
      language: language === 'javascript' ? 'node' : language,
      content: fetchedCode
    }, {
      withCredentials: true
    }).then((res) => {
      setOutput((state) => ({
        ...state,
        out: res.data?.out,
        success: res.data?.success
      }));
    }).catch(() => {
      toast.error('Something went wrong in running code!');
    }).finally(() => {
      setOutput((state) => ({
        ...state,
        loading: false
      }));
    })
  }

  const handleLogout = () => {
    apiClient.delete('/auth', { withCredentials: true }).then(() => {
      navigate('/');
      toast.success('Successfully Logged-Out', {position: 'top-right'});
    }).catch(() => {
      toast.error(`Something went wrong, Try again`, { position: 'top-right' });
    });
  };

  return (
    <>
      <div className="room">
        <div className="room-gradient-1"></div>
        <div className="room-gradient-2"></div>
        <div className="room-sidebar">
          <LanguageChanger
            languagesAvailable={languagesAvailable}
            handleLanguageChange={handleLanguageChange}
            current={language}
          />
          <CodeKeyBindingSelector
            codeKeybinding={codeKeybinding}
            codeKeybindingsAvailable={codeKeybindingsAvailable}
            handleCodeKeybindingChange={handleCodeKeybindingChange}
          />
          <button onClick={() => { copyToClipboard(id as string) }}>Copy Room id</button>
          <button onClick={() => {
            handleLeave()
          }}>Leave</button>
          <button onClick={() => { setSaveFileOpen((state) => !state) }}>Save</button>
          <button onClick={() => {
            navigate('/saved')
          }}>Saved Files</button>
          <button onClick={handleRunCode}>Run</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
        <div className="room-container">
          <div className="room-editor">
            <AceEditor
              setOptions={{ useWorker: false, fontSize: "18px" }}
              placeholder="Write your code here."
              className="roomCodeEditor"
              mode={language}
              keyboardHandler={codeKeybinding}
              theme="vibrant_ink"
              name="collabEditor"
              width={"900px"}
              height={"600px"}
              value={fetchedCode}
              onChange={onChange}
              fontSize={15}
              showPrintMargin={true}
              showGutter={true}
              highlightActiveLine={true}
              enableLiveAutocompletion={true}
              enableBasicAutocompletion={false}
              enableSnippets={false}
              wrapEnabled={true}
              tabSize={2}
              editorProps={{
                $blockScrolling: true
              }}
            />
          </div>
          <div className="left">
            <div className="room-sidebar-users">
              <p>Connected Users:</p>
              {fetchedUsers.map((each) => (
                <div key={each} className="room-sidebar-users-each">
                  <div className="avatar" style={{ backgroundColor: `${generateColor(each)}` }}>{each.slice(0, 2).toUpperCase()}</div>
                  <div className="name">{each}</div>
                </div>
              ))}
            </div>
            <div className="console">
              <p>output</p>
              {output.loading ? (
                <>
                  <h2>Loading....</h2>
                </>
              ) : (
                <>
                  {output.success ? (
                    <>
                      <h2 style={{ color: "green" }}>success</h2>
                      <p>{output.out}</p>
                    </>
                  ) : (
                    <>
                      {output.out.length > 0 && (
                        <>
                          <h2 style={{ color: "red" }}>error</h2>
                          <p>{output.out}</p>
                        </>
                      )}
                    </>
                  )}
                </>
              )}
              <p></p>
            </div>
          </div>
        </div>
      </div>
      <SaveFileModal open={saveFileOpen} handleSubmit={handleSave} closeModal={() => {
        setSaveFileOpen(false);
      }} />
    </>
  )
}