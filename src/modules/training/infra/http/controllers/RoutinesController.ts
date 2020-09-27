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
  Delete,
  Params,
  Body,
} from 'routing-controllers';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
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
  @Delete('/:routine_id')
  async delete(
    @Params() params: IDeleteParams,
    @Res() response: Response,
  ): Promise<Response> {
    try {
      const { routine_id } = params;

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
