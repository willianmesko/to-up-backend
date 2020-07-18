import Evaluation from '@modules/athletes/infra/typeorm/entities/Evaluation';
import ICreateEvaluationDTO from '@modules/athletes/dtos/ICreateEvaluationDTO';

export default interface IEvaluationRepository {
  create(data: ICreateEvaluationDTO): Promise<Evaluation>;
  getByAthleteId(athlete_id: string): Promise<Evaluation[]>;
}
