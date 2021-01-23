import { getRepository, Repository } from 'typeorm';

import IUsersAddressRepository from '@modules/users/repositories/IUsersAddressRepository';
import ICreateUserAddressDTO from '@modules/users/dtos/ICreateUserAddressDTO';
import UserAddress from '../entities/UserAddress';

class UsersAddressRepository implements IUsersAddressRepository {
  private ormRepository: Repository<UserAddress>;

  constructor() {
    this.ormRepository = getRepository(UserAddress);
  }

  public async find(user_id: string): Promise<UserAddress | undefined> {
    const userAddress = await this.ormRepository.findOne({
      where: { user_id },
    });

    return userAddress;
  }

  public async update(addressData: ICreateUserAddressDTO): Promise<void> {
    await this.ormRepository
      .createQueryBuilder()
      .update(UserAddress)
      .set(addressData)
      .where('id = :id', { id: addressData.id })
      .execute();
  }

  public async create(
    addressData: ICreateUserAddressDTO,
  ): Promise<UserAddress> {
    const userAddress = await this.ormRepository.create(addressData);


    return this.ormRepository.save(userAddress);
  }
}

export default UsersAddressRepository;
