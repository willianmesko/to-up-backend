import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IRoutineExerciceRepository from '@modules/training/repositories/IRoutineExerciceRepository';
import Exercice from '@modules/training/infra/typeorm/entities/Exercice';
import RoutineExercice from '@modules/training/infra/typeorm/entities/RoutineExercice';

@injectable()
class EditRoutineExerciceService {
  constructor(
    @inject('RoutineExerciceRepository')
    private routineExerciceRepository: IRoutineExerciceRepository,
  ) {}

  public async execute(editRoutineExercice: Exercice[]): Promise<void> {
    editRoutineExercice.map(async exercice => {
      const routineExercice = await this.routineExerciceRepository.find(
        exercice.id,
      );
      if (routineExercice) {
        routineExercice.repetitions = exercice.repetitions;
        routineExercice.sequence = exercice.sequence;
        routineExercice.volume = exercice.volume;

        await this.routineExerciceRepository.save(routineExercice);
      }
    });
  }
}

export default EditRoutineExerciceService;
