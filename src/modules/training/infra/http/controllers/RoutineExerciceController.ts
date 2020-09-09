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
  Put,
} from 'routing-controllers';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import CreateRoutineExerciceService from '@modules/training/services/CreateRoutineExerciceService';
import EditRoutineExerciceService from '@modules/training/services/EditRoutineExerciceService';

@JsonController('/routine_exercice')
@UseBefore(ensureAuthenticated)
export default class RoutineExerciceController {
  @Post('/')
  async create(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<Response> {
    try {
      const {
        routine_id,
        exercice_id,
        routine,
        exercice,
        volume,
        sequence,
        repetitions,
      } = request.body;

      const createRoutineExercice = container.resolve(
        CreateRoutineExerciceService,
      );

      const routineExercice = await createRoutineExercice.execute({
        routine_id,
        exercice_id,
        routine,
        exercice,
        volume,
        sequence,
        repetitions,
      });

      return response.json(classToClass(routineExercice));
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
  @Put('/')
  async edit(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<Response> {
    try {
      const data = request.body;

      const editRoutineExercice = container.resolve(EditRoutineExerciceService);

      const routineExercice = await editRoutineExercice.execute({
        editRoutineExercice: data,
      });

      return response.json(classToClass(routineExercice));
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
