import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import {
  JsonController,
  Res,
  Post,
  UseBefore,
  Req,
  Delete,
  Params,
  Put,
  Body,
} from 'routing-controllers';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import CreateRoutineExerciceService from '@modules/training/services/CreateRoutineExerciceService';
import EditRoutineExerciceService from '@modules/training/services/EditRoutineExerciceService';
import DeleteExerciceService from '@modules/training/services/DeleteExerciceService';
interface IExerciceRequest {
  routine_id: string;
  exercice_id: string;
  exercice_name: string;
  volume: number;
  sequence: number;
  repetitions: number;
  sort: number;
}

interface IEditRoutineRequest {
  editedRoutine: IExerciceRequest[];
}

interface IDeleteParams {
  exercice_id: string;
}
@JsonController('/routine_exercice')
@UseBefore(ensureAuthenticated)
export default class RoutineExerciceController {
  @Post('/')
  async create(
    @Body() body: IExerciceRequest,
    @Res() response: Response,
  ): Promise<Response> {
    try {
      const {
        routine_id,
        exercice_id,
        exercice_name,
        volume,
        sequence,
        repetitions,
        sort,
      } = body;

      const createRoutineExercice = container.resolve(
        CreateRoutineExerciceService,
      );

      const routineExercice = await createRoutineExercice.execute({
        routine_id,
        exercice_id,
        exercice_name,
        volume,
        sequence,
        repetitions,
        sort,
      });

      return response.json(classToClass(routineExercice));
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  @Put('/')
  async edit(
    @Body() body: IEditRoutineRequest,
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<Response> {
    try {
      const { editedRoutine } = body;

      const editRoutineExercice = container.resolve(EditRoutineExerciceService);

      const routineExercice = await editRoutineExercice.execute(editedRoutine);

      return response.json(classToClass(routineExercice));
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  @Delete('/:exercice_id')
  async index(
    @Params() params: IDeleteParams,
    @Res() response: Response,
  ): Promise<Response> {
    try {
      const { exercice_id } = params;
      const deleteExercice = container.resolve(DeleteExerciceService);

      const exercices = await deleteExercice.execute({
        exercice_id,
      });

      return response.json(classToClass(exercices));
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
