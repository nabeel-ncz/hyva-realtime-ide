import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SocketContext } from "../provider/SocketProvider";
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
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/ext-searchbox";
import LanguageChanger from "../components/LanguageChanger";
import CodeKeyBindingSelector from "../components/CodeKeyBindingSelector";

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

  return (
    <div className="room">
      <div className="roomSidebar">
        <div className="roomSidebarUsersWrapper">

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

          <p>Connected Users:</p>
          <div className="roomSidebarUsers">
            {fetchedUsers.map((each) => (
              <div key={each} className="roomSidebarUsersEach">
                <div className="roomSidebarUsersEachAvatar" style={{ backgroundColor: `${generateColor(each)}` }}>{each.slice(0, 2).toUpperCase()}</div>
                <div className="roomSidebarUsersEachName">{each}</div>
              </div>
            ))}
          </div>
        </div>

        <button className="roomSidebarCopyBtn" onClick={() => { copyToClipboard(id as string) }}>Copy Room id</button>
        <button className="roomSidebarBtn" onClick={() => {
          handleLeave()
        }}>Leave</button>
      </div>

      <AceEditor
        setOptions={{ useWorker: false }}
        placeholder="Write your code here."
        className="roomCodeEditor"
        mode={language}
        keyboardHandler={codeKeybinding}
        theme="monokai"
        name="collabEditor"
        width="400px"
        height="500px"
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
  )
}