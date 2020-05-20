import { getRepository, Repository } from 'typeorm';

import IAthletesRepository from '@modules/athletes/repositories/IAthletesRepository';
import ICreateAthleteDTO from '@modules/athletes/dtos/ICreateAthleteDTO';

import Athlete from '@modules/athletes/infra/typeorm/entities/Athlete';

class Athletes implements IAthletesRepository {
  private ormRepository: Repository<Athlete>;

  constructor() {
    this.ormRepository = getRepository(Athlete);
  }

  public async create(athleteData: ICreateAthleteDTO): Promise<Athlete> {
    const athlete = this.ormRepository.create(athleteData);

    await this.ormRepository.save(athlete);

    return athlete;
  }

  public async save(athlete: Athlete): Promise<Athlete> {
    return this.ormRepository.save(athlete);
  }

  public async findAll(id: string): Promise<Athlete[]> {
    return this.ormRepository.find({
      where: {
        trainer_id: id,
      },
    });
  }
}

export default Athletes;
