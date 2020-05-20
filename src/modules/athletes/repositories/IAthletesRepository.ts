import Athlete from '@modules/athletes/infra/typeorm/entities/Athlete';
import ICreateAthleteDTO from '@modules/athletes/dtos/ICreateAthleteDTO';

export default interface IAthletesRepository {
  findAll(id: string): Promise<Athlete[]>;
  // findById(id: string): Promise<Athlete | undefined>;

  create(data: ICreateAthleteDTO): Promise<Athlete>;
  save(athlete: Athlete): Promise<Athlete>;
}
