import { NextFunction, Request, Response } from "express";
import { Code } from "../database/models/code";

export const getCodeById = async (req: Request, res: Response, next: NextFunction) => {
    const codeId = req.params.id as string;
    try {
        const result = await Code.findById(codeId).populate('userRef');
        if(!result) {
            throw new Error("Code doesn't found!");
        }
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}