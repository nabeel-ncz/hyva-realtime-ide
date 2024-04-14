import { BrowserRouter, Route, Routes } from "react-router-dom";
import CodeEditor from "./pages/CodeEditor";
import Landing from "./pages/Landing";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/editor" element={<CodeEditor />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

