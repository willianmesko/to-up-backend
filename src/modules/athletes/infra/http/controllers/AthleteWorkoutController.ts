import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import ShowAthleteWorkout from '@modules/athletes/services/ShowAthleteWorkout';

export default class AthleteWorkoutController {

  async show(
    request: Request,
    response: Response,
  ): Promise<Response> {
    try {
      const { id } = request.body;

      const showAthleteWorkout = container.resolve(ShowAthleteWorkout);

      const athlete = await showAthleteWorkout.execute(id);

      return response.json(classToClass(athlete));
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
