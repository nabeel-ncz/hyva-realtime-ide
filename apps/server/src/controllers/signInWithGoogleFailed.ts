import { Request, Response } from "express";
export const signInWithGoogleFailed = async (req: Request, res: Response) => {
    res.redirect(`${process.env.CLIENT_URL}oauth2?error=${encodeURIComponent("Authentication Failed")}`);
};