import { getRepository } from "typeorm";
import { Provider } from "../entity/Provider";

export class ProviderService {

  /**
   * metodo salvar
   */
  async save({name, cnpj}: Provider): Promise<Provider> {
    const providerExists = await getRepository(Provider).findOne({where: {name} });
    if(providerExists) {
      throw new Error('There is already a Provider with this name!');
    }
    const provider = getRepository(Provider).create({name, cnpj});
    await getRepository(Provider).save(provider);
    return provider;
  }

  /**
   * metodo listar todos
   */
  async findAll(): Promise<Provider[]> {
    const list = await getRepository(Provider).find();
    return list;
  }

  /**
   * metodo buscar por id
   */
  async findById(id: number): Promise<Provider> {
    const provider = await getRepository(Provider).findOne(id);
    if(!provider) {
      throw new Error('Provider not found!');
    }
    return provider;
  }

  /**
   * metodo para atualizar
   */
  async update(id: number, {name, cnpj}): Promise<Provider> {
    const provider = await this.findById(id);
    const providerExists = await getRepository(Provider).findOne({where: {name} });
    if(providerExists && !provider) {
      throw new Error('There is already a provider with this name!');
    }
    provider.name = name;
    provider.cnpj = cnpj;
    await getRepository(Provider).save(provider);
    return provider;
  }

  /**
   * metodo para excluir
   */
  async delete(id: number): Promise<void> {
    const provider = await getRepository(Provider).findOne(id);
    if(!provider) {
      throw new Error('Provider not found!')
    }
    await getRepository(Provider).remove(provider); 
  }

}