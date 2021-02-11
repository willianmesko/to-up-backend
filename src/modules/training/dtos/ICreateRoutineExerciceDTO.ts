import Routine from '@modules/training/infra/typeorm/entities/Routine';
import Exercice from '@modules/training/infra/typeorm/entities/Exercice';

export default interface ICreateRoutineExerciceDTO {
  routine_id: string;
  exercice_id: string;
  exercice_name: string;
  volume?: number;
  sequence?: number;
  repetitions?: number;
  sort?: number;
}
