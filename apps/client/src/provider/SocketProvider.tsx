import { createContext } from "react";
import { io, Socket } from "socket.io-client";

interface InitialContextType {
    socket: Socket;
}
const socket: Socket = io(import.meta.env.REACT_APP_WEB_SOCKET_URL ?? "http://localhost:3000", {
    transports: ['websocket']
});

export const SocketContext = createContext<InitialContextType>({ socket });

export default function SocketProvider({ children }: { children: React.ReactNode }) {
    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
}