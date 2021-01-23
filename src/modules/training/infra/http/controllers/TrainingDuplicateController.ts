import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import DuplicateTrainingService from '@modules/training/services/DuplicateTrainingService';

interface IRequest {
  title: string;
}

export default class TrainingDuplicateController {

  async create(

    request: Request,
    response: Response,
  ): Promise<Response> {
    try {
      const { title } = request.body;
      const { training_id } = request.params;
      const duplicateTraining = container.resolve(DuplicateTrainingService);

      const training = await duplicateTraining.execute({
        training_id,
        title,
        trainer_id: request.user.id,
      });

      return response.json(classToClass(training));
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
