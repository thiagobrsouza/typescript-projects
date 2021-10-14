import { getRepository, Like } from "typeorm";
import { Credential } from "../entity/Credential";
import { Customer } from "../entity/Customer";
import { Group } from "../entity/Group";

interface IRequest {
    title: string;
    address: string;
    username: string;
    password: string;
    notes: string;
    customer: Customer;
    group: Group;
}

export class CredentialService {

    /**
     * method for save
     */
    async save({title, address, username, password, notes, customer, group}: IRequest): Promise<Credential> {
        const obj = getRepository(Credential).create({title, address, username, password, notes, customer, group});
        await getRepository(Credential).save(obj);
        return obj;
    }

    /**
     * method for list all
     */
    async listAll(): Promise<Credential[]> {
        const list = await getRepository(Credential).find();
        return list;
    }

    /**
     * method for find by id
     */
    async findById(id: number): Promise<Credential> {
        const obj = await getRepository(Credential).findOne(id);
        if (!obj) {
            throw new Error('Credential not found.');
        }
        return obj;
    }

    /**
     * method for update
     */
    async update(id: number, {title, address, username, password, notes, customer, group}: IRequest): Promise<Credential> {
        const obj = await this.findById(id);
        obj.title = title;
        obj.address = address;
        obj.username = username;
        obj.password = password;
        obj.notes = notes;
        obj.customer = customer;
        obj.group = group;
        await getRepository(Credential).save(obj);
        return obj;  
    }

    /**
     * method for delete
     */
    async delete(id: number): Promise<void> {
        const obj = await getRepository(Credential).findOne(id);
        if (!obj) {
            throw new Error('Credential not found!');
        }
        await getRepository(Credential).remove(obj);
    }

    /**
     * method for find by name
     */

}