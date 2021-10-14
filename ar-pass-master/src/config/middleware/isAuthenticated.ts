import { verify } from "jsonwebtoken";
import secret from "../auth";
import { AppError } from "../errors/AppError";

interface ITokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

export default function isAuthenticated(req, res, next): void {
    const authHeader = req.headers.authorization;

    if(!authHeader) {
        throw new AppError('JWT Token is missing.');
    }

    const [, token] = authHeader.split(' ');

    try {
        const decodedToken = verify(token, secret.jwt.secret);
        const { sub } = decodedToken as ITokenPayload;

        req.user = {
            id: sub,
        }

        return next();
    } catch {
        throw new AppError('Invalid JWT Token.');
    }
}