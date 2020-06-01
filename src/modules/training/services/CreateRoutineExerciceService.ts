import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IRoutineExerciceRepository from '@modules/training/repositories/IRoutineExerciceRepository';

import Routine from '@modules/training/infra/typeorm/entities/Routine';
import Exercice from '@modules/training/infra/typeorm/entities/Exercice';
import RoutineExercice from '@modules/training/infra/typeorm/entities/RoutineExercice';

interface IRequest {
  routine_id: string;
  exercice_id: string;
  routine: Routine;
  exercice: Exercice;
  volume: number;
  repetitions: number;
  sequence: number;
}

@injectable()
class CreateRoutineExerciceService {
  constructor(
    @inject('RoutineExerciceRepository')
    private routineExerciceRepository: IRoutineExerciceRepository,
  ) {}

  public async execute({
    routine_id,
    exercice_id,
    routine,
    exercice,
    volume,
    repetitions,
    sequence,
  }: IRequest): Promise<RoutineExercice> {
    const routineExercice = this.routineExerciceRepository.create({
      routine_id,
      exercice_id,
      routine,
      exercice,
      volume,
      repetitions,
      sequence,
    });

    return routineExercice;
  }
}

export default CreateRoutineExerciceService;
