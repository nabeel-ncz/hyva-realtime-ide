import { NextFunction, Request, Response } from "express"

export const logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.cookie("access_token", "", { maxAge: 0 });
        res.cookie("connect.sid", "", { maxAge: 0 });
        res.status(204).json({});
    } catch (error) {
        next(error);
    }
}