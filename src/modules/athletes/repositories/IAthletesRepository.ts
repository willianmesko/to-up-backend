import Athlete from '@modules/athletes/infra/typeorm/entities/Athlete';
import ICreateAthleteDTO from '@modules/athletes/dtos/ICreateAthleteDTO';

export default interface IAthletesRepository {
  findAll(trainer_id: string): Promise<Athlete[]>;
  findByTrainderId(trainer_id: string): Promise<Athlete[]>;
  findById(id: string): Promise<Athlete | undefined>;
  findByEmail(email: string): Promise<Athlete | undefined>;
  create(data: ICreateAthleteDTO): Promise<Athlete>;
  save(athlete: Athlete): Promise<Athlete>;
}
