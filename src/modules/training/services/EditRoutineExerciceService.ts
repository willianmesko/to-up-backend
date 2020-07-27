import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IRoutineExerciceRepository from '@modules/training/repositories/IRoutineExerciceRepository';

import RoutineExercice from '@modules/training/infra/typeorm/entities/RoutineExercice';

@injectable()
class EditRoutineExerciceService {
  constructor(
    @inject('RoutineExerciceRepository')
    private routineExerciceRepository: IRoutineExerciceRepository,
  ) {}

  public async execute({ editRoutineExercice }): Promise<void> {
    editRoutineExercice.map(async editData => {
      const routineExercice = await this.routineExerciceRepository.find(
        editData.id,
      );
      routineExercice.repetitions = editData.repetitions;
      routineExercice.sequence = editData.sequence;
      routineExercice.volume = editData.volume;

      await this.routineExerciceRepository.save(routineExercice);
    });
  }
}

export default EditRoutineExerciceService;
