require('dotenv').config();
import { Server } from "socket.io";
import StartApplication, { server } from "./app";
import { socketEventHandler } from "./infra/socket";
import { connectToDatabase } from "./database";

(async () => {
    try {
        StartApplication;
        await connectToDatabase();
        const io = new Server(server, {
            cors: {
                origin: "*",
                methods: ["GET", "POST"]
            }
        });
        socketEventHandler(io);
        process.on('SIGTERM', async () => {
            throw new Error("SIGTERM recieved");
        })
    } catch (error) {
        console.error(error);
    }
})();
