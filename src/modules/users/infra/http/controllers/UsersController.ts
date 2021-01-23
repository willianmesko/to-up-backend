import { Response, Request } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import CreateUserService from '@modules/users/services/CreateUserService';
import FindAllUsersService from '@modules/users/services/FindAllUsersService';
import ICreateUserDTO from '../../../dtos/ICreateUserDTO';

export default class UsersController {

  async create(
    request: Request,
    response: Response,
  ): Promise<Response> {
    try {
      const { name, surname, sexo, email, password } = request.body;

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


  async index(
    response: Response,
    request: Request,
  ): Promise<Response> {
    try {
      const findAll = container.resolve(FindAllUsersService);

      const user = await findAll.execute(request.user.id);

      return response.json(classToClass(user));
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
