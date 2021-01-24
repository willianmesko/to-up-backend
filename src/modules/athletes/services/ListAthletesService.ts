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

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) { }

  public async execute(id: string): Promise<Athlete[]> {
    try {
      let athletes = await this.cacheProvider.recover<Athlete[]>(
        'athletes-list',
      );

      if (!athletes) {
        athletes = await this.athletesRepository.findAll(id);

        await this.cacheProvider.save('athletes-list', athletes);

      }

      return athletes;

    } catch (error) {
      throw new AppError('Erro', 400);
    }
  }
}

export default ListAthletesService;
