import RoutineExercice from '@modules/training/infra/typeorm/entities/RoutineExercice';
import ICreateRoutineExerciceDTO from '@modules/training/dtos/ICreateRoutineExerciceDTO';
import IEditRoutineExerciceDTO from '@modules/training/dtos/IEditRoutineExerciceDTO';

export default interface IRoutineExerciceRepository {
  create(
    routineExerciceData: ICreateRoutineExerciceDTO,
  ): Promise<RoutineExercice>;
  save(routineExercice: RoutineExercice): Promise<RoutineExercice>;
  find(id: string): Promise<RoutineExercice>;
}
