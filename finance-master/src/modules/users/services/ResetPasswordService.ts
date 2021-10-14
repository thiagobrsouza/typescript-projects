import AppError from "@shared/errors/AppError";
import { hash } from "bcryptjs";
import { addHours, isAfter } from "date-fns";
import { getCustomRepository } from "typeorm";
import UserRepository from "../typeorm/repositories/UserRepository";
import UserTokensRepository from "../typeorm/repositories/UserTokensRepository";

interface IRequest {
    token: string;
    password: string;
}

class ResetPasswordService {
    public async execute({token, password}: IRequest): Promise<void> {
        const userRepository = getCustomRepository(UserRepository);
        const userTokenRepository = getCustomRepository(UserTokensRepository);

        const userToken = await userTokenRepository.findByToken(token);
        // valida se o token é valido
        if (!userToken) {
            throw new AppError('User token does not exists.');
        }

        const user = await userRepository.findById(userToken.user_id);

        // valida se o usuário é valido
        if (!user) {
            throw new AppError('User does not exists.');
        }

        // atribui ao token uma validade de 2 horas
        const tokenCreatedAt = userToken.created_at;
        const compareDate = addHours(tokenCreatedAt, 2);

        if (isAfter(Date.now(), compareDate)) {
            throw new AppError('Token expired.');
        }

        // enfim atualiza a senha
        user.password = await hash(password, 8);

        // salva a senha
        await userRepository.save(user);

    }
}

export default ResetPasswordService;
