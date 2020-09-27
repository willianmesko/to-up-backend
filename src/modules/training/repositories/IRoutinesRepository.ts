import Routine from '@modules/training/infra/typeorm/entities/Routine';
import ICreateRoutineDTO from '@modules/training/dtos/ICreateRoutineDTO';

export default interface IRoutinesRepository {
  findAll(training_id: string): Promise<Routine[]>;
  create(routineData: ICreateRoutineDTO): Promise<Routine>;
  save(training: Routine): Promise<Routine>;
  delete(routine_id: string): Promise<void>;
}
