import { Response, Request } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import CreateAthleteService from '@modules/athletes/services/CreateAthleteService';
import ICreateAthleteDTO from '../../../dtos/ICreateAthleteDTO';


export default class AthleteSignUpController {

  async create(
    request: Request,
    response: Response,
  ): Promise<Response> {
    try {
      const createAthlete = container.resolve(CreateAthleteService);
      const { name, surname, email, password, sexo } = request.body;
      const athlete = await createAthlete.execute({
        name,
        surname,
        email,
        password,
        sexo,
      });

      return response.json(classToClass(athlete));
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
