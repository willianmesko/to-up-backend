import { Response, Request } from 'express';
import { container } from 'tsyringe';
import { JsonController, Body, Res, Post } from 'routing-controllers';
import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService';

interface IRequest {
  email: string;
}


export default class ForgotPasswordController {

  async create(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { email } = request.body;

    const sendForgotPasswordEmail = container.resolve(
      SendForgotPasswordEmailService,
    );

    await sendForgotPasswordEmail.execute({
      email,
    });

    return response.status(204).json();
  }
}
