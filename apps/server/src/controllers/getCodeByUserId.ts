import { NextFunction, Request, Response } from "express";
import { AuthenticatedRequest } from "../utils/types";
import { Code } from "../database/models/code";

export const getCodeByUserId = async (req: Request, res: Response, next: NextFunction) => {
    const authReq = req as AuthenticatedRequest;
    const userId = authReq.user?._id;
    try {
        const result = await Code.find({ userRef: userId }).populate('userRef');
        if(!result) {
            throw new Error("Code doesn't found!");
        }
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}