import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/jwt/verifyAccessToken";

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const decoded = await verifyAccessToken(req.cookies['access_token'] as string);
        if(decoded) {
            req.user = decoded;
            return next();
        }
        throw new Error('Unauthorized')
    } catch (error) {
        next(error);
    }
};