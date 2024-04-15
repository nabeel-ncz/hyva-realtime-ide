import express, { Application, NextFunction, Request, Response } from "express";
import {
    signInWithGoogle,
    signInWithGoogleFailed,
    signInWithGoogleRedirect,
    signInWithGoogleSuccess
} from "./controllers";
import cors from "cors";
import passport from "passport";
import session from "express-session";
const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: process.env.SESSION_SECRET as string, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req: Request, res: Response) => {
    res.send('Hey Nabeel!');
});

app.get('/oauth2/google', signInWithGoogle);
app.get('/oauth2/google/redirect', signInWithGoogleRedirect);
app.get('/oauth2/google/success', signInWithGoogleSuccess);
app.get('/oauth2/google/failed', signInWithGoogleFailed);

app.get("*", (req: Request, res: Response, next: NextFunction) => {
    res.status(404).send("Page not found!");
});

app.use((error: Error, req: Request, res: Response) => {
    res.status(400).send(JSON.stringify(error));
})

const PORT = process.env.PORT ?? 3000;
const server = app.listen(PORT, () => {
    console.log('server listening on port:', PORT);
})

export default app;
export { server };