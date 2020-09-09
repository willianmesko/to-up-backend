import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import {
  JsonController,
  UseBefore,
  Get,
  Req,
  Res,
  Post,
} from 'routing-controllers';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import CreateEvaluationService from '@modules/athletes/services/CreateEvaluationService';
import ShowEvaluationAthleteService from '@modules/athletes/services/ShowEvaluationAthleteService';
@JsonController('/athletes/evaluation')
@UseBefore(ensureAuthenticated)
export default class EvaluationController {
  @Post('/')
  async create(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<Response> {
    try {
      const {
        type,
        type_title,
        date,
        athlete_age,
        athlete_weight,
        athlete_height,
        athlete_sexo,
        athlete_ethnicity,
        subscapular,
        tricipital,
        breastplate,
        axilar,
        leg,
        thigh,
        suprailiac,
        abdominal,
        chest,
        waist,
        hip,
        right_arm,
        abdomen,
        left_arm,
        right_thigh,
        left_thigh,
        right_leg,
        left_leg,
        observation,
        left_forearm,
        right_forearm,
        athlete_id,
      } = request.body;

      const createEvaluation = container.resolve(CreateEvaluationService);

      const evaluation = await createEvaluation.execute({
        type,
        type_title,
        date,
        athlete_age,
        athlete_weight,
        athlete_height,
        athlete_sexo,
        athlete_ethnicity,
        subscapular,
        tricipital,
        breastplate,
        axilar,
        thigh,
        leg,
        suprailiac,
        abdominal,
        chest,
        waist,
        hip,
        right_arm,
        left_arm,
        right_thigh,
        abdomen,
        left_thigh,
        right_leg,
        left_leg,
        observation,
        left_forearm,
        right_forearm,
        athlete_id,
        trainer_id: request.user.id,
      });

      return response.json(classToClass(evaluation));
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  @Get('/')
  async list(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<Response> {
    try {
      const showEvaluation = container.resolve(ShowEvaluationAthleteService);

      const { athlete_id } = request.params;

      const evaluation = await showEvaluation.execute(athlete_id);

      return response.json(classToClass(evaluation));
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
