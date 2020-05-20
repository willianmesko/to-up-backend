import { inject, injectable } from 'tsyringe';

// import AppError from '@shared/errors/AppError';
import IAthletesRepository from '@modules/athletes/repositories/IAthletesRepository';

// import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
// import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import Athlete from '@modules/athletes/infra/typeorm/entities/Athlete';

@injectable()
class CreateAthleteService {
  constructor(
    @inject('AthletesRepository')
    private athletesRepository: IAthletesRepository,
  ) {}

  public async execute(id: string): Promise<Athlete[]> {
    const athletes = await this.athletesRepository.findAll(id);

    return athletes;
  }
}

export default CreateAthleteService;
