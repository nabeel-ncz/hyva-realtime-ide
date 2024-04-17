import { NextFunction, Request, Response } from "express";
import { AuthenticatedRequest } from "../utils/types";
import { Code } from "../database/models/code";

export const postCode = async (req: Request, res: Response, next: NextFunction) => {
    const authReq = req as AuthenticatedRequest;
    const userId = authReq.user?._id;
    const { content, ...body } = req.body;
    try {
        const created = await Code.create({
            ...body,
            content: content ?? "//empty",
            userRef: userId
        });
        res.status(201).json(created);
    } catch (error) {
        next(error);
    }
}