import UserAddress from '@modules/users/infra/typeorm/entities/UserAddress';
import ICreateUserAddressDTO from '@modules/users/dtos/ICreateUserAddressDTO';

export default interface IUsersAddressRepository {
  create(data: ICreateUserAddressDTO): Promise<UserAddress>;
  update(data: ICreateUserAddressDTO): Promise<void>;
  find(user_id: string): Promise<UserAddress | undefined>;
}
