import { NextFunction, Request, Response } from "express"
import { User } from "../database/models/user";

interface AuthenticatedRequest extends Request {
    user?: { _id: string }
}

export const getAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authReq = req as AuthenticatedRequest;
        const user = await User.findById(authReq.user?._id as string);
        if(!user) {
            throw new Error("User doesn't exist");
        }
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}