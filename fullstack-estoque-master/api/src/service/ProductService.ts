import { getRepository } from "typeorm";
import { Product } from "../entity/Product";

export class ProductService {

  /**
   * metodo salvar
   */
  async save({name, amount, price, provider}): Promise<Product> {
    const productExists = await getRepository(Product).findOne({where: {name} });
    if(productExists) {
      throw new Error('There is already a Product with this name!');
    }
    const product = getRepository(Product).create({name, amount, price, provider});
    await getRepository(Product).save(product);
    return product;
  }

  /**
   * metodo listar todos
   */
  async findAll(): Promise<Product[]> {
    const list = await getRepository(Product).find({relations: ['provider']});
    return list;
  }

  /**
   * metodo buscar por id
   */
  async findById(id: number): Promise<Product> {
    const product = await getRepository(Product).findOne(id, {relations: ['provider']});
    if(!product) {
      throw new Error('Product not found!');
    }
    return product;
  }

  /**
   * metodo para atualizar
   */
  async update(id: number, {name, amount, price, provider}): Promise<Product> {
    const product = await this.findById(id);
    const productExists = await getRepository(Product).findOne({where: {name} });
    if(productExists && !product) {
      throw new Error('There is already a Product with this name!');
    }
    product.name = name;
    product.amount = amount;
    product.price = price;
    product.provider = provider;
    await getRepository(Product).save(product);
    return product;
  }

  /**
   * metodo para excluir
   */
  async delete(id: number): Promise<void> {
    const product = await getRepository(Product).findOne(id);
    if(!product) {
      throw new Error('Product not found!')
    }
    await getRepository(Product).remove(product); 
  }

}