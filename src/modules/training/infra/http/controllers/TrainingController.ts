import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ShowOneTrainerTraining from '@modules/training/services/ShowOneTrainerTraining';
import ListAllTrainerTraining from '@modules/training/services/ListAllTrainerTraining';
import CreateTrainingService from '@modules/training/services/CreateTrainingService';
import DeleteTrainingService from '@modules/training/services/DeleteTrainingService';
interface IRequest {
  title: string;
  description: string;
  cycle: number;
  objective: number;
}
interface IDeleteParams {
  training_id: string;
}

export default class TrainingController {

  async create(
    request: Request,

    response: Response,
  ): Promise<Response> {
    try {
      const { title, description, cycle, objective } = request.body;

      const createTraining = container.resolve(CreateTrainingService);

      const training = await createTraining.execute({
        title,
        description,
        cycle,
        objective,
        trainer_id: request.user.id,
      });

      return response.json(classToClass(training));
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  async show(
    request: Request,
    response: Response,
  ): Promise<Response> {
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

  async index(
    request: Request,
    response: Response,
  ): Promise<Response> {
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

  async delete(
    request: Request,
    response: Response,
  ): Promise<Response> {
    try {
      const { training_id } = request.params;
      const deleteTraining = container.resolve(DeleteTrainingService);

      const training = await deleteTraining.execute({
        training_id,
      });

      return response.json(classToClass(training));
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
