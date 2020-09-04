import Exercice from '@modules/training/infra/typeorm/entities/Exercice';
import ICreateExerciceDTO from '@modules/training/dtos/ICreateExerciceDTO';
import IFindExerciceDTO from '@modules/training/dtos/IFindExerciceDTO';

export default interface IExercicesRepository {
  listAll(trainer_id: string): Promise<Exercice[]>;
  findByExerciceByNameAndTrainer(
    exercice: IFindExerciceDTO,
  ): Promise<Exercice | undefined>;
  create(exerciceData: ICreateExerciceDTO): Promise<Exercice>;
  save(exercice: Exercice): Promise<Exercice>;
}
