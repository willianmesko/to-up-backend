import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateAthleteService from '@modules/athletes/services/CreateAthleteService';
import ListAthletesService from '@modules/athletes/services/ListAthletesService';



export default class AthletesController {

  async create(
    request: Request,
    response: Response,
  ): Promise<Response> {
    try {

      const createAthlete = container.resolve(CreateAthleteService);

      const athlete = await createAthlete.execute({
        ...request.body,
        trainer_id: request.user.id,
      });

      return response.json(classToClass(athlete));
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }


  async list(
    request: Request,
    response: Response,
  ): Promise<Response> {
    try {
      const listAthletes = container.resolve(ListAthletesService);

      const athletes = await listAthletes.execute(request.user.id);

      return response.json(classToClass(athletes));
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
