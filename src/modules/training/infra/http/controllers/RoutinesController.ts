import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import {
  JsonController,
  Res,
  Post,
  UseBefore,
  Req,
  Get,
  Body,
} from 'routing-controllers';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import CreateRoutineService from '@modules/training/services/CreateRoutineService';
import ListAllRoutinesService from '@modules/training/services/ListAllRoutinesService';

interface IRequest {
  title: string;
  description: string;
  training_id: string;
}
@JsonController('/routines')
@UseBefore(ensureAuthenticated)
export default class RoutinesController {
  @Get('/:training_id')
  async index(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<Response> {
    try {
      const { training_id } = request.params;
      console.log(training_id);
      const listAllRoutines = container.resolve(ListAllRoutinesService);

      const routines = await listAllRoutines.execute({
        training_id,
      });

      return response.json(classToClass(routines));
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
  @Post('/')
  async create(
    @Body() body: IRequest,
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<Response> {
    try {
      const { title, description, training_id } = body;

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
