import { inject, injectable } from 'tsyringe';
import IAthletesRepository from '@modules/athletes/repositories/IAthletesRepository';

// import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import Athlete from '@modules/athletes/infra/typeorm/entities/Athlete';
import AppError from '@shared/errors/AppError';

@injectable()
class ListAthletesService {
  constructor(
    @inject('AthletesRepository')
    private athletesRepository: IAthletesRepository,
  ) // @inject('ICacheProvider')
  // private cacheProvider: ICacheProvider,
  {}

  public async execute(id: string): Promise<Athlete[]> {
    try {
      // const atheletesCached = await this.cacheProvider.recover(
      //   'athletes-cached',
      // );

      // if (!atheletesCached) {
      const athletes = await this.athletesRepository.findAll(id);

      // await this.cacheProvider.save('athletes-cached', athletes);

      return athletes;
      // }

      // return atheletesCached;
    } catch (error) {
      throw new AppError('Erro', 400);
    }
  }
}

export default ListAthletesService;
