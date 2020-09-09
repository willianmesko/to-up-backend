import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import {
  JsonController,
  Get,
  Res,
  Post,
  UseBefore,
  Req,
} from 'routing-controllers';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import CreateExerciceService from '@modules/training/services/CreateExerciceService';
import ListAllExercicesService from '@modules/training/services/ListAllExercicesService';

@JsonController('/exercices')
@UseBefore(ensureAuthenticated)
export default class ExercicesController {
  @Post('/')
  async create(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<Response> {
    try {
      const {
        name,
        muscle_group_id,
        muscle_group_name,
        youtube_video_id,
      } = request.body;

      const CreateExercice = container.resolve(CreateExerciceService);

      const exercice = await CreateExercice.execute({
        name,
        muscle_group_id,
        muscle_group_name,
        youtube_video_id,
        trainer_id: request.user.id,
      });

      return response.json(classToClass(exercice));
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
