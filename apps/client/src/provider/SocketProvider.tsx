import { createContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import { apiClient } from "../utils/axios";

interface InitialContextType {
    socket: Socket;
}
const socket: Socket = io(import.meta.env.VITE_WEB_SOCKET_URL || "https://hyva-server.onrender.com", {
    transports: ['websocket']
});

export const SocketContext = createContext<InitialContextType>({ socket });

export default function SocketProvider({ children }: { children: React.ReactNode }) {
    const { id } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        if (!id) {
            navigate("/", { replace: true });
        } else {
            const fetchUser = async () => {
                try {
                    const res = await apiClient.get('/auth', { withCredentials: true });
                    const user = res.data;
                    socket.emit("user_join", { roomId: `${id}`, username: `${user?.email}` });
                } catch (error) {
                    navigate("/", { replace: true });
                }
            }
            fetchUser();
        }
    }, []);
    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
}