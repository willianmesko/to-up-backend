import Exercice from '@modules/training/infra/typeorm/entities/Exercice';
import ICreateExerciceDTO from '@modules/training/dtos/ICreateExerciceDTO';

export default interface IExercicesRepository {
  listAll(trainer_id: string): Promise<Exercice[]>;

  create(exerciceData: ICreateExerciceDTO): Promise<Exercice>;
  save(exercice: Exercice): Promise<Exercice>;
}
