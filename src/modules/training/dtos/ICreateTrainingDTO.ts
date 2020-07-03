import Athlete from '@modules/athletes/infra/typeorm/entities/Athlete';

export default interface ICreateTrainingDTO {
  title: string;
  description: string;
  trainer_id: string;
  cycle: number;
  objective: number;
  athletes?: Athlete[];
}
