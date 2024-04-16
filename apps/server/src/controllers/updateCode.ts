import { NextFunction, Request, Response } from "express";
import { Code } from "../database/models/code";

export const updateCode = async (req: Request, res: Response, next: NextFunction) => {
    const { _id, ...rest } = req.body;
    try {
        const updated = await Code.findByIdAndUpdate(_id, {
            $set: { ...rest }
        }, { new: true });
        res.status(201).json(updated);
    } catch (error) {
        next(error);
    }
}