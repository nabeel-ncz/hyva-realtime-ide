import { createContext, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import { UserContext } from "./UserProvider";

interface InitialContextType {
    socket: Socket;
}
const socket: Socket = io(import.meta.env.WEB_SOCKET_URL ?? "http://localhost:3000", {
    transports: ['websocket']
});

export const SocketContext = createContext<InitialContextType>({ socket });

export default function SocketProvider({ children }: { children: React.ReactNode }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const user = useContext(UserContext).data;
    useEffect(() => {
        if (!id || !user) {
            navigate("/", { replace: true });
        }
        socket.emit("user_join", { roomId: `${id}`, username: `${user?.username}` });
    }, []);
    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
}