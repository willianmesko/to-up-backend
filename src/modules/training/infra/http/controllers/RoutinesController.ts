import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import CreateRoutineService from '@modules/training/services/CreateRoutineService';
import ListAllRoutinesService from '@modules/training/services/ListAllRoutinesService';
import DeleteRoutineService from '@modules/training/services/DeleteRoutineService';

interface IRequest {
  title: string;
  description: string;
  training_id: string;
}

interface IDeleteParams {
  routine_id: string;
}

export default class RoutinesController {

  async index(
    request: Request,
    response: Response,
  ): Promise<Response> {
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

  async create(

    request: Request,
    response: Response,
  ): Promise<Response> {
    try {
      const { title, description, training_id, athlete_id } = request.body;

      const createRoutine = container.resolve(CreateRoutineService);

      const routine = await createRoutine.execute({
        trainer_id: request.user.id,
        title,
        description,
        training_id,
        athlete_id
      });

      return response.json(classToClass(routine));
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  async delete(
    request: Request,
    response: Response,
  ): Promise<Response> {
    try {
      const { routine_id } = request.params;

      const deleteRoutine = container.resolve(DeleteRoutineService);

      const routine = await deleteRoutine.execute({
        routine_id,
      });

      return response.json(classToClass(routine));
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
