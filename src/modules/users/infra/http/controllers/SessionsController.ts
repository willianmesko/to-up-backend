import { Response, Request } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';


interface ICreateSessionDTO {
  email: string;
  password: string;
}

export default class SessionsController {

  async create(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUser = container.resolve(AuthenticateUserService);

    const { user, token } = await authenticateUser.execute({
      email,
      password,
    });

    return response.send({ user: classToClass(user), token });
  }
}
