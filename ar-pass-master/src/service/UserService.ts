import { hash } from "bcryptjs";
import { getRepository } from "typeorm";
import { User } from "../entity/User";

interface IRequest {
    name: string;
    email: string;
    password: string;
}

export class UserService {

    /**
     * method for save
     */
    async save({name, email, password}: IRequest): Promise<User> {
        const objExists = await getRepository(User).findOne(
            {where: {email} });
        if (objExists) {
            throw new Error('Email address already exists');
        }

        const hashedPassword = await hash(password, 10);

        const obj = await getRepository(User).create({name, email, password: hashedPassword});
        await getRepository(User).save(obj);
        return obj;
    }

    /**
     * method for list all
     */
    async listAll(): Promise<User[]> {
        const list = await getRepository(User).find();
        return list;
    }

    /**
     * method for find by id
     */
     async findById(id: number): Promise<User> {
        const obj = await getRepository(User).findOne(id);
        if (!obj) {
            throw new Error('User not found.');
        }
        return obj;
    }

    /**
     * method for update
     */
    async update(id: number, {name, email, password}: IRequest): Promise<User> {
        const obj = await this.findById(id);
        const hashedPassword = await hash(password, 10);
        if (obj.email === email) {
            obj.name = name;
            obj.email = email;
            obj.password = hashedPassword;
            await getRepository(User).save(obj);
            return obj;
        }
        else {
            throw new Error('There is already customer with this name.');
        }   
    }
}