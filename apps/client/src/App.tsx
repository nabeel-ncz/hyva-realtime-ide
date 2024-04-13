import { BrowserRouter, Route, Routes } from "react-router-dom";
import CodeEditor from "./pages/CodeEditor";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<CodeEditor />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

