import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IRoutineExerciceRepository from '@modules/training/repositories/IRoutineExerciceRepository';

import Routine from '@modules/training/infra/typeorm/entities/Routine';
import Exercice from '@modules/training/infra/typeorm/entities/Exercice';
import RoutineExercice from '@modules/training/infra/typeorm/entities/RoutineExercice';

interface IRequest {
  routine_id: string;
  exercice_id: string;
  exercice_name: string;
  volume: number;
  repetitions: number;
  sequence: number;
  sort: number;
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
    exercice_name,
    volume,
    repetitions,
    sequence,
    sort,
  }: IRequest): Promise<RoutineExercice> {
    const routineExercice = this.routineExerciceRepository.create({
      routine_id,
      exercice_id,
      exercice_name,
      volume,
      repetitions,
      sequence,
      sort: 0,
    });

    return routineExercice;
  }
}

export default CreateRoutineExerciceService;
