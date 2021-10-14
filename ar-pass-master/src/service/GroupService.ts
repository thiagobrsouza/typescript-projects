import { getRepository, Like } from "typeorm";
import { Group } from "../entity/Group";

interface IRequest {
    name: string;
}

export class GroupService {

    /**
     * method for save
     */
    async save({name}: IRequest): Promise<Group> {
        const objExists = await getRepository(Group).findOne(
            {where: {name} });
        if (objExists) {
           throw new Error('There is already a Group with this name'); 
        }
        const obj = getRepository(Group).create({name});
        await getRepository(Group).save(obj);
        return obj;
    }

    /**
     * method for list all
     */
    async listAll(): Promise<Group[]> {
        const list = await getRepository(Group).find();
        return list;
    }

    /**
     * method for find by id
     */
    async findById(id: number): Promise<Group> {
        const obj = await getRepository(Group).findOne(id);
        if (!obj) {
            throw new Error('Group not found.');
        }
        return obj;
    }

    /**
     * method for update
     */
    async update(id: number, {name}: IRequest): Promise<Group> {
        const obj = await this.findById(id);
        const objExists = await getRepository(Group).findOne(
            {where: {name} });
        if (objExists) {
           throw new Error('There is already a Group with this name'); 
        }
        obj.name = name;
        await getRepository(Group).save(obj);
        return obj;
    }

    /**
     * method for delete
     */
    async delete(id: number): Promise<void> {
        const obj = await getRepository(Group).findOne(id);
        if (!obj) {
            throw new Error('Group not found!');
        }
        await getRepository(Group).remove(obj);
    }

    /**
     * method for find by name
     */
    async findByName(name: string): Promise<Group> {
        const obj = await getRepository(Group).findOne({
            where: {name: Like(`%${name}%`)}
        });
        if(!obj) {
            throw new Error('Group not found.');
        }
        return obj;
    }

}