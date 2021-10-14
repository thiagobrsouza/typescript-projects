import { getRepository } from "typeorm";
import { Customer } from "../entity/Customer";

export class CustomerService {

  async save({name, notes}: Customer): Promise<Customer> {
    const customerExists = await getRepository(Customer).findOne({where: {name} });
    if (customerExists) {
      throw new Error('Cliente já cadastrado!');
    }
    const customer = getRepository(Customer).create({name, notes});
    await getRepository(Customer).save(customer);
    return customer;
  }

  async find(): Promise<Customer[]> {
    const list = await getRepository(Customer).find();
    return list;
  }

  async findById(id: string): Promise<Customer> {
    const customer = await getRepository(Customer).findOne(id);
    if(!customer) {
      throw new Error('Cliente não encontrado!');
    }
    return customer;
  }

  async update(id: string, name: string, notes: string): Promise<Customer> {
    const customer = await this.findById(id);
    const customerExists = await getRepository(Customer).findOne({where: {name} });
    if (customerExists) {
      throw new Error('Cliente já cadastrado!');
    }
    customer.name = name;
    customer.notes = notes;
    await getRepository(Customer).save(customer);
    return customer;
  }

  async remove(id: string): Promise<void> {
    const customer = await this.findById(id);
    if(!customer) {
      throw new Error('Cliente não encontrado!');
    }
    await getRepository(Customer).remove(customer);
  }

}