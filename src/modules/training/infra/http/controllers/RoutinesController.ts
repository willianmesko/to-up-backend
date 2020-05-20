import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateRoutineService from '@modules/training/services/CreateRoutineService';

export default class RoutinesController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { title, description } = request.body;

      const createRoutine = container.resolve(CreateRoutineService);

      const routine = await createRoutine.execute({
        title,
        description,
        training_id: 'd669749e-31ca-4a57-908e-d6bd2942142a',
      });

      return response.json(classToClass(routine));
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
