import { Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import { JsonController, Body, Res, Post } from 'routing-controllers';

interface ICreateSessionDTO {
  email: string;
  password: string;
}
@JsonController()
export default class SessionsController {
  @Post('/sessions')
  async create(
    @Body() body: ICreateSessionDTO,
    @Res() response: Response,
  ): Promise<Response> {
    const { email, password } = body;

    const authenticateUser = container.resolve(AuthenticateUserService);

    const { user, token } = await authenticateUser.execute({
      email,
      password,
    });

    return response.send({ user: classToClass(user), token });
  }
}
