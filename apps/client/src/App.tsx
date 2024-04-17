import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import CodeEditor from "./pages/CodeEditor";
import Landing from "./pages/Landing";
import SocketProvider from "./provider/SocketProvider";
import { Toaster } from "react-hot-toast";
import { useContext } from "react";
import { UserContext } from "./provider/UserProvider";
import SavedFiles from "./pages/SavedFiles";

export default function App() {
  const user = useContext(UserContext).data;
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
          <Route path="/saved" element={user ? <SavedFiles /> : <Navigate to={"/"} />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

