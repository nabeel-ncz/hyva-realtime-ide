require('dotenv').config();
import { Server } from "socket.io";
import StartApplication, { server } from "./app";
import { socketEventHandler } from "./infra/socket";
import { connectToDatabase } from "./database";
import { envChecker } from "./utils/envChecker";

(async () => {
    try {
        StartApplication;
        await envChecker();
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
