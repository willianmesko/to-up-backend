import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IRoutineExerciceRepository from '../repositories/IRoutineExerciceRepository';

interface IRequest {
  exercice_id: string;
}

@injectable()
class DeleteExerciceService {
  constructor(
    @inject('RoutineExerciceRepository')
    private routineExercice: IRoutineExerciceRepository,
  ) {}

  public async execute({ exercice_id }: IRequest): Promise<void> {
    try {
      await this.routineExercice.delete(exercice_id);
    } catch (error) {
      throw new AppError('falha');
    }
  }
}

export default DeleteExerciceService;
