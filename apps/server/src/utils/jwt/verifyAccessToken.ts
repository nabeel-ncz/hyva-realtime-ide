import { verify } from "jsonwebtoken";

export const verifyAccessToken = (token: string) => {
    return new Promise((resolve, reject) => {
        verify(token, process.env.USER_JWT_SECRET as string, (err, decoded) => {
            if(err) {
                reject(err);
            }
            resolve(decoded);
        });
    });
}