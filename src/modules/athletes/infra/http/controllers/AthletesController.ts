import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateAthleteService from '@modules/athletes/services/CreateAthleteService';
import ListAthletesService from '@modules/athletes/services/ListAthletesService';

export default class AthletesController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const trainer_id = request.user.id;
      const {
        name,
        email,
        password,
        sexo,
        age,
        body_mass,
        stature,
        aerobic_profile,
        training_level,
        physical_activity,
        objective,
        basal_metabolic_rate,
        spent_daily_train,
        mass_muscle,
        mass_fat,
        personal_profile,
        imc,
      } = request.body;

      const createAthlete = container.resolve(CreateAthleteService);

      const athlete = await createAthlete.execute({
        name,
        email,
        password,
        trainer_id,
        sexo,
        age,
        body_mass,
        stature,
        aerobic_profile,
        training_level,
        physical_activity,
        objective,
        basal_metabolic_rate,
        spent_daily_train,
        mass_muscle,
        mass_fat,
        personal_profile,
        imc,
      });

      return response.json(classToClass(athlete));
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  public async list(request: Request, response: Response): Promise<Response> {
    try {
      const listAthletes = container.resolve(ListAthletesService);

      const athletes = await listAthletes.execute({ id: request.user.id });

      return response.json(classToClass(athletes));
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
