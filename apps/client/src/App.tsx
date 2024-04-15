import { BrowserRouter, Route, Routes } from "react-router-dom";
import CodeEditor from "./pages/CodeEditor";
import Landing from "./pages/Landing";
import SocketProvider from "./provider/SocketProvider";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/editor/:id" element={
            <SocketProvider>
              <CodeEditor />
            </SocketProvider>
          } />
        </Routes>
      </BrowserRouter>
    </>
  )
}

