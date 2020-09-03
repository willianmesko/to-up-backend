import User from '@modules/users/infra/typeorm/entities/User';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
// import IFindAllAthletes from '@modules/users/dtos/IFindAllAthletes';

export default interface IUsersRepository {
  findAll(except_user_id: string): Promise<User[] | undefined>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
}
