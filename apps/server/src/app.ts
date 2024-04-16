import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import "./utils/passport/googleOAuth2Strategy";
import swagger from "swagger-ui-express";
import { swaggerSpecs } from "./utils/swagger";
import ApplicationRoutes from "./routes";

const app: Application = express();
const corsOptions = {
    origin: process.env.CLIENT_URL as string,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: process.env.SESSION_SECRET as string, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req: Request, res: Response) => {
    res.send('Hey Nabeel!');
});

app.use('/api-docs', swagger.serve, swagger.setup(swaggerSpecs));

app.use(ApplicationRoutes);

app.get("*", (req: Request, res: Response, next: NextFunction) => {
    res.status(404).send("Page not found!");
});

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(400).send(JSON.stringify(error));
})

const PORT = process.env.PORT ?? 3000;
const server = app.listen(PORT, () => {
    console.log('server listening on port:', PORT);
})

export default app;
export { server };