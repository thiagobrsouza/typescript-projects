import { getRepository, Like } from "typeorm";
import { Customer } from "../entity/Customer";

interface IRequest {
    name: string;
    contactName: string;
    contactEmail: string;
}

export class CustomerService {

    /**
     * method for save
     */
    async save({name, contactName, contactEmail}: IRequest): Promise<Customer> {
        const objExists = await getRepository(Customer).findOne(
            {where: {name} });
        if (objExists) {
           throw new Error('There is already a Customer with this name'); 
        }
        const obj = getRepository(Customer).create({name, contactName, contactEmail});
        await getRepository(Customer).save(obj);
        return obj;
    }

    /**
     * method for list all
     */
    async listAll(): Promise<Customer[]> {
        const list = await getRepository(Customer).find();
        return list;
    }

    /**
     * method for find by id
     */
    async findById(id: number): Promise<Customer> {
        const obj = await getRepository(Customer).findOne(id);
        if (!obj) {
            throw new Error('Customer not found.');
        }
        return obj;
    }

    /**
     * method for update
     */
    async update(id: number, {name, contactName, contactEmail}: IRequest): Promise<Customer> {
        const obj = await this.findById(id);
        if (obj.name === name) {
            obj.name = name;
            obj.contactName = contactName;
            obj.contactEmail = contactEmail;
            await getRepository(Customer).save(obj);
            return obj;
        }
        else {
            throw new Error('There is already customer with this name.');
        }   
    }

    /**
     * method for delete
     */
    async delete(id: number): Promise<void> {
        const obj = await getRepository(Customer).findOne(id);
        if (!obj) {
            throw new Error('Customer not found!');
        }
        await getRepository(Customer).remove(obj);
    }

    /**
     * method for find by name
     */
    async findByName(name: string): Promise<Customer> {
        const obj = await getRepository(Customer).findOne({
            where: {name: Like(`%${name}%`)}
        });
        if(!obj) {
            throw new Error('Customer not found.');
        }
        return obj;
    }

}