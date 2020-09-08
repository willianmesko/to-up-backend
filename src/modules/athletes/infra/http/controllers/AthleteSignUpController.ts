import { Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import { JsonController, Body, Res, Post } from 'routing-controllers';
import CreateAthleteService from '@modules/athletes/services/CreateAthleteService';
import ICreateAthleteDTO from '../../../dtos/ICreateAthleteDTO';

@JsonController('/athletes')
export default class AthleteSignUpController {
  @Post('/signup')
  async create(
    @Body() body: ICreateAthleteDTO,
    @Res() response: Response,
  ): Promise<Response> {
    try {
      const { name, surname, email, password, sexo } = body;

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
