import { Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import {
  JsonController,
  Body,
  Res,
  Get,
  Post,
  UseBefore,
} from 'routing-controllers';
import CreateUserService from '@modules/users/services/CreateUserService';
import FindAllUsersService from '@modules/users/services/FindAllUsersService';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ICreateUserDTO from '../../../dtos/ICreateUserDTO';

@JsonController('/users')
export default class UsersController {
  @Post('/')
  async create(
    @Body() body: ICreateUserDTO,
    @Res() response: Response,
  ): Promise<Response> {
    try {
      const { name, surname, sexo, email, password } = body;

      const createUser = container.resolve(CreateUserService);

      const user = await createUser.execute({
        name,
        surname,
        sexo,
        email,
        password,
      });

      return response.json(classToClass(user));
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  @Get('/')
  @UseBefore(ensureAuthenticated)
  async index(@Res() response: Response): Promise<Response> {
    try {
      const findAll = container.resolve(FindAllUsersService);

      const user = await findAll.execute();

      return response.json(classToClass(user));
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
