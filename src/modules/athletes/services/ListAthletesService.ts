import { inject, injectable } from 'tsyringe';
import IAthletesRepository from '@modules/athletes/repositories/IAthletesRepository';

// import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
// import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import Athlete from '@modules/athletes/infra/typeorm/entities/Athlete';
import AppError from '@shared/errors/AppError';

@injectable()
class CreateAthleteService {
  constructor(
    @inject('AthletesRepository')
    private athletesRepository: IAthletesRepository,
  ) {}

  public async execute(id: string): Promise<Athlete[]> {
    try {
      const athletes = await this.athletesRepository.findAll(id);

      return athletes;
    } catch (error) {
      throw new AppError('Erro', 400);
    }
  }
}

export default CreateAthleteService;
