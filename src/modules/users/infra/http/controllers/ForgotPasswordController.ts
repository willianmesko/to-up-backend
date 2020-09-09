import { Response } from 'express';
import { container } from 'tsyringe';
import { JsonController, Body, Res, Post } from 'routing-controllers';
import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService';

interface IRequest {
  email: string;
}

@JsonController('/password')
export default class ForgotPasswordController {
  @Post('/forgot')
  async create(
    @Body() body: IRequest,
    @Res() response: Response,
  ): Promise<Response> {
    const { email } = body;

    const sendForgotPasswordEmail = container.resolve(
      SendForgotPasswordEmailService,
    );

    await sendForgotPasswordEmail.execute({
      email,
    });

    return response.status(204).json();
  }
}
