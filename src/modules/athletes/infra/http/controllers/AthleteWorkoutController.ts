import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import { JsonController, UseBefore, Get, Req, Res } from 'routing-controllers';
import ShowAthleteWorkout from '@modules/athletes/services/ShowAthleteWorkout';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

@JsonController('/athletes')
@UseBefore(ensureAuthenticated)
export default class AthleteWorkoutController {
  @Get('/workout')
  async show(
    @Req() request: Request,
    @Res() response: Response,
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
