import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import {
  JsonController,
  UseBefore,
  Res,
  Post,
  Body,
  Req,
  Get,
} from 'routing-controllers';
import CreateAthleteService from '@modules/athletes/services/CreateAthleteService';
import ListAthletesService from '@modules/athletes/services/ListAthletesService';
import ICreateAthleteDTO from '@modules/athletes/dtos/ICreateAthleteDTO';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

@JsonController('/athletes')
@UseBefore(ensureAuthenticated)
export default class AthletesController {
  @Post('/')
  async create(
    @Req() request: Request,
    @Body() body: ICreateAthleteDTO,
    @Res() response: Response,
  ): Promise<Response> {
    try {
      const {
        name,
        surname,
        email,
        password,
        ethnicity,
        sexo,
        age,
        avatar,
        body_mass,
        stature,
        aerobic_profile,
        training_level,
        physical_activity,
        objective,
      } = body;

      const createAthlete = container.resolve(CreateAthleteService);

      const athlete = await createAthlete.execute({
        name,
        surname,
        password,
        ethnicity,
        email,
        trainer_id: request.user.id,
        sexo,
        age,
        avatar,
        body_mass,
        stature,
        aerobic_profile,
        training_level,
        physical_activity,
        objective,
      });

      return response.json(classToClass(athlete));
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
      const listAthletes = container.resolve(ListAthletesService);

      const athletes = await listAthletes.execute({ id: request.user.id });

      return response.json(classToClass(athletes));
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
