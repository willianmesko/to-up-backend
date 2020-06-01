import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ShowOneTrainerTraining from '@modules/training/services/ShowOneTrainerTraining';
import ListAllTrainerTraining from '@modules/training/services/ListAllTrainerTraining';
import CreateTrainingService from '@modules/training/services/CreateTrainingService';

export default class TrainingController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { title, description, difficulty, objective } = request.body;

      const createTraining = container.resolve(CreateTrainingService);

      const training = await createTraining.execute({
        title,
        description,
        difficulty,
        objective,
        trainer_id: request.user.id,
      });

      return response.json(classToClass(training));
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  public async show(request: Request, response: Response): Promise<Response> {
    try {
      const { training_id } = request.params;

      const showTrainerTraining = container.resolve(ShowOneTrainerTraining);

      const training = await showTrainerTraining.execute({
        training_id,
        trainer_id: request.user.id,
      });

      return response.json(classToClass(training));
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  public async index(request: Request, response: Response): Promise<Response> {
    try {
      const listTrainerTraining = container.resolve(ListAllTrainerTraining);

      const training = await listTrainerTraining.execute({
        trainer_id: request.user.id,
      });

      return response.json(classToClass(training));
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
