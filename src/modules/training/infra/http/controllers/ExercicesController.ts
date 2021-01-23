import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import CreateExerciceService from '@modules/training/services/CreateExerciceService';
import ListAllExercicesService from '@modules/training/services/ListAllExercicesService';

interface IRequest {
  name: string;
  muscle_group_name: string;
  muscle_group_id: number;
  youtube_video_id: string;
  calorie: number;
  duration: number;
}

export default class ExercicesController {

  async create(
    request: Request,
    response: Response,
  ): Promise<Response> {

    try {

      const CreateExercice = container.resolve(CreateExerciceService);

      const exercice = await CreateExercice.execute({
        ...request.body,
        trainer_id: request.user.id,
      });

      return response.json(classToClass(exercice));
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }


  async index(
    request: Request,
    response: Response,
  ): Promise<Response> {
    try {
      const ListExercices = container.resolve(ListAllExercicesService);

      const exercices = await ListExercices.execute({
        trainer_id: request.user.id,
      });

      return response.json(classToClass(exercices));
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
