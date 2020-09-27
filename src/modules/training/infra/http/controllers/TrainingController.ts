import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import {
  JsonController,
  Get,
  Res,
  Post,
  UseBefore,
  Body,
  Req,
  Params,
  Delete,
} from 'routing-controllers';
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
@JsonController('/training')
@UseBefore(ensureAuthenticated)
export default class TrainingController {
  @Post('/')
  async create(
    @Req() request: Request,
    @Body() body: IRequest,
    @Res() response: Response,
  ): Promise<Response> {
    try {
      const { title, description, cycle, objective } = body;

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

  @Get('/:training_id')
  async show(
    @Req() request: Request,
    @Res() response: Response,
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
  @Get('/')
  async index(
    @Req() request: Request,
    @Res() response: Response,
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
  @Delete('/:training_id')
  async delete(
    @Params() params: IDeleteParams,
    @Res() response: Response,
  ): Promise<Response> {
    try {
      const { training_id } = params;
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
