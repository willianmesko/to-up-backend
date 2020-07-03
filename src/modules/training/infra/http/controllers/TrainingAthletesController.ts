import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AddAthletesToTrainingService from '@modules/training/services/AddAthletesToTrainingService';

export default class TrainingAthletesController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { athletes_ids, training_id } = request.body;

      const addAthletesToTraining = container.resolve(
        AddAthletesToTrainingService,
      );

      const training = await addAthletesToTraining.execute({
        athletes_ids,
        training_id,
        trainer_id: request.user.id,
      });

      return response.json(classToClass(training));
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
