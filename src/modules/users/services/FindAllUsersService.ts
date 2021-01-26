import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import User from '@modules/users/infra/typeorm/entities/User';

@injectable()
class FindAllUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) { }

  public async execute(except_user_id: string): Promise<User[] | undefined> {

    let users = await this.cacheProvider.recover<User[] | undefined>('users-list');

    if (!users) {
      users = await this.usersRepository.findAll(except_user_id);

      await this.cacheProvider.save('users-list', users);
    }
    return users
  }
}

export default FindAllUsersService;
