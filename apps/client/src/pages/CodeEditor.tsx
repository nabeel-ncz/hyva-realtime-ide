import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

export default function CodeEditor() {

  const navigate = useNavigate();
  const { id = "room@1" } = useParams();
  const { socket } = useContext(SocketContext);
  const [fetchedUsers, setFetchedUsers] = useState<string[]>([]);
  const [fetchedCode, setFetchedCode] = useState<string>("");
  const [language, setLanguage] = useState<string>("javascript");
  const [codeKeybinding, setCodeKeybinding] = useState<any>(undefined);

  const languagesAvailable: string[] = ["javascript", "java", "c_cpp", "python", "typescript", "golang", "yaml", "html"]
  const codeKeybindingsAvailable: string[] = ["default", "emacs", "vim"];

  function onChange(newValue: string) {
    setFetchedCode(newValue);
    socket.emit("update_code", { roomId: id, code: newValue });
    socket.emit("sync_code", { roomId: id });
  }

  function handleLanguageChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setLanguage(e.target.value)
    socket.emit("update_language", { id, languageUsed: e.target.value })
    socket.emit("sync_language", { id: id });
  }

  function handleCodeKeybindingChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setCodeKeybinding(e.target.value === "default" ? undefined : e.target.value)
  }

  function handleLeave() {
    socket.disconnect();
    !socket.connected && navigate('/', { replace: true, state: {} });
  }

  function copyToClipboard(text: string) {
    try {
      navigator.clipboard.writeText(text);
      toast.success('Editor Room Id Edited');
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    socket.emit("when a user joins", { roomId: `room@1`, username: `user@${Math.random() * 20 + 838}` });
  }, []);

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
      toast(`${username} joined`)
    })

    socket.on("member_left", ({ username }) => {
      toast(`${username} left`)
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
  }, [socket])

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
        </div>
        <div className="room-container">
          <div className="room-editor">
            <AceEditor
              setOptions={{ useWorker: false, fontSize:"18px" }}
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
                  <div className="room-sidebar-users-each-avatar" style={{ backgroundColor: `${generateColor(each)}` }}>{each.slice(0, 2).toUpperCase()}</div>
                  <div className="room-sidebar-user-each-name">{each}</div>
                </div>
              ))}
            </div>
            <div className="console">
              <p>output</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}