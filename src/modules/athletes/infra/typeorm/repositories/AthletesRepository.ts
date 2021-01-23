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
    return await this.ormRepository.save(athlete);
  }

  public async findByEmail(email: string): Promise<Athlete | undefined> {

    const athlete = await this.ormRepository.findOne({
      where: { email },
    });



    return athlete;
  }

  public async findById(id: string): Promise<Athlete | undefined> {
    const athlete = await this.ormRepository.findOne({
      where: { id },
      relations: ['trainer', 'trainings'],
    });

    return athlete;
  }

  public async findAll(id: string): Promise<Athlete[]> {
    return this.ormRepository.find({
      where: {
        trainer_id: id,
      },
      relations: ['trainings'],
    });
  }
}

export default Athletes;
