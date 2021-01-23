import { Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import CreateAthleteService from '@modules/athletes/services/CreateAthleteService';
import ICreateAthleteDTO from '../../../dtos/ICreateAthleteDTO';


export default class AthleteSignUpController {

  async create(
    request: ICreateAthleteDTO,
    response: Response,
  ): Promise<Response> {
    try {
      const { name, surname, email, password, sexo } = request;

      const createAthlete = container.resolve(CreateAthleteService);

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
