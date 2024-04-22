import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import CodeEditor from "./pages/CodeEditor";
import Landing from "./pages/Landing";
import SocketProvider from "./provider/SocketProvider";
import { Toaster } from "react-hot-toast";
import SavedFiles from "./pages/SavedFiles";
import useAxios from "./hooks/useAxios";

export default function App() {
  const { data: user } = useAxios({ url: '/auth', method: 'get' });
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/editor/:id" element={
            user ? (
              <>
                <SocketProvider>
                  <CodeEditor />
                </SocketProvider>
              </>
            ) : (
              <Navigate to={"/"} />
            )
          } />
          <Route path="/saved" element={user ? <SavedFiles /> : <Navigate to={"/"} />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

