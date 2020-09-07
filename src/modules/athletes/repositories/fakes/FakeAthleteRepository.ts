import { uuid } from 'uuidv4';

import IAthletesRepository from '@modules/athletes/repositories/IAthletesRepository';
import ICreateAthleteDTO from '@modules/athletes/dtos/ICreateAthleteDTO';

import Athlete from '@modules/athletes/infra/typeorm/entities/Athlete';

class FakeAthleteRepository implements IAthletesRepository {
  private athletes: Athlete[] = [];

  public async create(athleteData: ICreateAthleteDTO): Promise<Athlete> {
    const athlete = new Athlete();

    Object.assign(athlete, { id: uuid() }, athleteData);

    this.athletes.push(athlete);
    console.log(athlete);
    return athlete;
  }

  public async findAll(id: string): Promise<Athlete[]> {
    return this.athlete;
  }
}

export default FakeAthleteRepository;
