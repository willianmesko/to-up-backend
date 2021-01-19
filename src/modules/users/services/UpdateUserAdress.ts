import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersAddressRepository from '@modules/users/repositories/IUsersAddressRepository';

import ICreateUserAdressDTO from '@modules/users/dtos/ICreateUserAddressDTO';

import UserAddress from '@modules/users/infra/typeorm/entities/UserAddress';
interface IRequest extends ICreateUserAdressDTO {
  user_id: string;
}

@injectable()
class UpdateUserAdress {
  constructor(
    @inject('UsersAddressRepository')
    private usersAddressRepository: IUsersAddressRepository,
  ) {}

  public async execute({
    user_id,
    city,
    state,
    country,
  }: ICreateUserAdressDTO): Promise<void> {
    const userAddress = await this.usersAddressRepository.find(user_id);

    if (userAddress) {
      userAddress.city = city;
      userAddress.state = state;
      userAddress.country = country;

      return this.usersAddressRepository.update(userAddress);
    }

    await this.usersAddressRepository.create({
      user_id,
      city,
      country,
      state,
    });
  }
}

export default UpdateUserAdress;
