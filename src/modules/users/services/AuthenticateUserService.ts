import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import authConfig from '@config/auth';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IAthletesRepository from '@modules/athletes/repositories/IAthletesRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import User from '@modules/users/infra/typeorm/entities/User';
import Athlete from '@modules/athletes/infra/typeorm/entities/Athlete';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User | Athlete;
  token: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('AthletesRepository')
    private athletesRepository: IAthletesRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) { }

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);
    await this.cacheProvider.invalidate('users-list');
    await this.cacheProvider.invalidate('athletes-list');
    if (!user) {
      const athlete = await this.athletesRepository.findByEmail(email);
      if (!athlete) {
        throw new AppError('Incorrect email/password combination.', 401);
      }

      const passwordMatched = await this.hashProvider.compareHash(
        password,
        athlete.password,
      );

      if (!passwordMatched) {
        throw new AppError('Incorrect email/password combination.', 401);
      }

      const token = sign({ role: 'athlete' }, authConfig.jwt.secret, {
        subject: athlete.id,
        expiresIn: authConfig.jwt.expiresIn,
      });

      return {
        user: athlete,
        token,
      };
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const token = sign({ role: 'trainer' }, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
