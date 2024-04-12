import { useRef } from 'react';
import Editor, { Monaco } from "@monaco-editor/react";
import { WebrtcProvider } from "y-webrtc";
import { MonacoBinding } from "y-monaco";
import * as Y from "yjs";

// Setup Monaco Editor
// Attach YJS Text to Monaco Editor

export default function App() {
  const editorRef = useRef<Monaco | null>(null);
  function handleEditorDidMount(editor: Monaco) {
    if (editorRef.current) {
      editorRef.current = editor;
      // Initialize YJS
      const doc = new Y.Doc(); // a collection of shared objects -> Text
      // Connect to peers (or start connection) with WebRTC
      const provider = new WebrtcProvider("test-room", doc); // room1, room2
      const type = doc.getText("monaco"); // doc { "monaco": "what our IDE is showing" }
      // Bind YJS to Monaco 
      const binding = new MonacoBinding(type, editorRef.current.getModel(), new Set([editorRef.current]), provider.awareness);
      console.log(provider.awareness);
    }
  }

  return (
    <Editor
      height="100vh"
      width="100vw"
      theme="vs-dark"
      onMount={handleEditorDidMount}
    />
  )
}

