import { inject, injectable } from 'tsyringe';

// import AppError from '@shared/errors/AppError';
import IAthletesRepository from '@modules/athletes/repositories/IAthletesRepository';

// import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
// import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import Athlete from '@modules/athletes/infra/typeorm/entities/Athlete';

@injectable()
class ShowAthleteWorkout {
  constructor(
    @inject('AthletesRepository')
    private athletesRepository: IAthletesRepository,
  ) {}

  public async execute(id: string): Promise<Athlete | undefined> {
    const athletes = await this.athletesRepository.findById(id);

    return athletes;
  }
}

export default ShowAthleteWorkout;
