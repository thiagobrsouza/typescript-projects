import AppError from "@shared/errors/AppError";
import { compare, hash } from 'bcryptjs'
import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import UserRepository from "../typeorm/repositories/UserRepository";

interface IRequest {
    user_id: string;
    name: string;
    email: string;
    password?: string;
    old_password?: string;
}

class UpdateProfileService {
    public async execute({user_id, name, email, password, old_password}: IRequest): Promise<User> {
        const userRepository = getCustomRepository(UserRepository);

        const user = await userRepository.findById(user_id);
        if (!user) {
            throw new AppError('User not found.');
        }

        const userUpdateEmail = await userRepository.findByEmail(email);
        // se o updateemail trouxe o resulta e se o id não é o mesmo que o do user_id
        if (userUpdateEmail && userUpdateEmail.id != user_id) {
            throw new AppError('There is already one user with this email.');
        }

        // se existe uma senha e não existe uma senha antiga, não deixaremos mudar senha
        if (password && !old_password) {
            throw new AppError('Old password is required.');
        }

        // se ele enviou a senha antiga e nova, iremos verificar a senha antiga é realmente antiga dele
        if (password && old_password) {
            const checkOldPassword = await compare(old_password, user.password);
            if (!checkOldPassword) {
                throw new AppError('Old password doest not match.');
            }
            user.password = await hash(password, 8);
        }

        user.name = name;
        user.email = email;

        await userRepository.save(user);

        return user;
    }
}

export default UpdateProfileService;
