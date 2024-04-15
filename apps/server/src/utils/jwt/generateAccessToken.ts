import { sign } from "jsonwebtoken";

export const generateAccessToken = ({ userId }: { userId: string }) => {
    return sign({ _id: userId }, process.env.USER_JWT_SECRET as string, {
        expiresIn: 60 * 60 * 24 * 2
    });
}