import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateRoutineService from '@modules/training/services/CreateRoutineService';
import ListAllRoutinesService from '@modules/training/services/ListAllRoutinesService';

export default class RoutinesController {
  public async index(request: Request, response: Response): Promise<Response> {
    try {
      const { training_id } = request.params;

      const listAllRoutines = container.resolve(ListAllRoutinesService);

      const routines = await listAllRoutines.execute({
        training_id,
      });

      return response.json(classToClass(routines));
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { title, description, training_id } = request.body;

      const createRoutine = container.resolve(CreateRoutineService);

      const routine = await createRoutine.execute({
        title,
        description,
        training_id,
      });

      return response.json(classToClass(routine));
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
