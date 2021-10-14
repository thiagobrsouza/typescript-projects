import { getRepository } from "typeorm";
import { Group } from "../entity/Group";

export class GroupService {

  async save({name}: Group): Promise<Group> {
    const groupExists = await getRepository(Group).findOne({where: {name} });
    if (groupExists) {
      throw new Error('Grupo já cadastrado!');
    }
    const group = getRepository(Group).create({name});
    await getRepository(Group).save(group);
    return group;
  }

  async find(): Promise<Group[]> {
    const list = await getRepository(Group).find();
    return list;
  }

  async findById(id: string): Promise<Group> {
    const group = await getRepository(Group).findOne(id);
    if(!group) {
      throw new Error('Grupo não encontrado!');
    }
    return group;
  }

  async update(id: string, name: string): Promise<Group> {
    const group = await this.findById(id);
    const groupExists = await getRepository(Group).findOne({where: {name} });
    if (groupExists) {
      throw new Error('Grupo já cadastrado!');
    }
    group.name = name;
    await getRepository(Group).save(group);
    return group;
  }

  async remove(id: string): Promise<void> {
    const group = await this.findById(id);
    if(!group) {
      throw new Error('Grupo não encontrado!');
    }
    await getRepository(Group).remove(group);
  }

}