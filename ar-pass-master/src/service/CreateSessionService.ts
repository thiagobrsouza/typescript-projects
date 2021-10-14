import { createQueryBuilder, getRepository } from "typeorm";
import { User } from "../entity/User";
import * as jwt from "jsonwebtoken";
import secret from "../config/auth";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: User;
    token: string;
}

export class CreateSessionService {

    /**
     * create a session
     */
    async create({email, password}: IRequest): Promise<IResponse> {
        const user = await getRepository(User).findOne(
            {where: [ { email: email}, { password: password} ]});

        if (!user) {
            throw new Error('Incorrect email/password combination.');
        }

        const token = jwt.sign({user: user.id, timestamp: new Date()},
            secret.jwt.secret,
            {expiresIn: secret.jwt.expiresIn});

        return {user, token};

    }
}