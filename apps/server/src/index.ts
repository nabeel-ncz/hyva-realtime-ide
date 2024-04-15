import express, { Application, Request, Response } from "express";
import { socketEventHandler } from "./infra/socket";
import { Server } from "socket.io";
import http from "http";
import cors from "cors";

const app: Application = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.get('/', (req: Request, res: Response) => {
    res.send('Hey Nabeel!');
});

socketEventHandler(io);
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`listening on port : ${PORT}`);
});
