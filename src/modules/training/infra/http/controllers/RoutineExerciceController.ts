import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateRoutineExerciceService from '@modules/training/services/CreateRoutineExerciceService';
import EditRoutineExerciceService from '@modules/training/services/EditRoutineExerciceService';

export default class RoutineExerciceController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const {
        routine_id,
        exercice_id,
        routine,
        exercice,
        volume,
        sequence,
        repetitions,
      } = request.body;

      const createRoutineExercice = container.resolve(
        CreateRoutineExerciceService,
      );

      const routineExercice = await createRoutineExercice.execute({
        routine_id,
        exercice_id,
        routine,
        exercice,
        volume,
        sequence,
        repetitions,
      });

      return response.json(classToClass(routineExercice));
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  public async edit(request: Request, response: Response): Promise<Response> {
    try {
      const data = request.body;

      const editRoutineExercice = container.resolve(EditRoutineExerciceService);

      const routineExercice = await editRoutineExercice.execute({
        editRoutineExercice: data,
      });

      return response.json(classToClass(routineExercice));
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
