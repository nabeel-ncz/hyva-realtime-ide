import { Request, Response } from "express";
import { generateAuthToken } from "../utils/jwt/generateAuthToken";

interface AuthenticatedRequest extends Request {
    user?: { _id: string }
}

export const signInWithGoogleSuccess = async (req: Request, res: Response) => {
    const authReq = req as AuthenticatedRequest;
    if (authReq.user && authReq.user._id) {
        const id = authReq.user._id as string;
        const token = generateAuthToken({ userId: id });
        res.cookie("access_token", token, { maxAge: 1000 * 60 * 60 * 1, httpOnly: true });
        res.redirect(`${process.env.CLIENT_URL}`);
    } else {
        res.redirect(`${process.env.CLIENT_URL}oauth2?error=${encodeURIComponent("Authentication Failed")}`);
    }
}