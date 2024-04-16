import { createContext, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import { UserContext } from "./UserProvider";
import { apiClient } from "../utils/axios";

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
    const { data: user } = useContext(UserContext);
    useEffect(() => {
        if (!id) {
            navigate("/", { replace: true });
        } else if (!user) {
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
        } else if (id && user) {
            socket.emit("user_join", { roomId: `${id}`, username: `${user?.email}` });
        } else {
            return navigate("/", { replace: true });
        }
    }, []);
    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
}