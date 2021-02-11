import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IRoutineExerciceRepository from '@modules/training/repositories/IRoutineExerciceRepository';

import Routine from '@modules/training/infra/typeorm/entities/Routine';
import Exercice from '@modules/training/infra/typeorm/entities/Exercice';
import RoutineExercice from '@modules/training/infra/typeorm/entities/RoutineExercice';



interface ISelectedExercices {
  exercice_id: string;
  exercice_name: string;
  volume?: number;
  repetitions?: number;
  sequence?: number;
  sort?: number;
}
interface IRequest {
  routine_id: string;
  selectedExercices: ISelectedExercices[]
}

@injectable()
class CreateRoutineExerciceService {
  constructor(
    @inject('RoutineExerciceRepository')
    private routineExerciceRepository: IRoutineExerciceRepository,
  ) { }

  public async execute({ routine_id, selectedExercices, }: IRequest): Promise<void> {

    selectedExercices.map(async (exercice) => {
      await this.routineExerciceRepository.create({
        routine_id,
        exercice_id: exercice.exercice_id,
        exercice_name: exercice.exercice_name,
        volume: exercice.volume,
        repetitions: exercice.repetitions,
        sequence: exercice.sequence
      })
    })



  }
}

export default CreateRoutineExerciceService;
