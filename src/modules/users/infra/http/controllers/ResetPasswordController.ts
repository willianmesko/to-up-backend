import { Response } from 'express';
import { container } from 'tsyringe';
import { JsonController, Body, Res, Post, Req } from 'routing-controllers';
import ResetPasswordService from '@modules/users/services/ResetPasswordService';

interface IRequest {
  password: string;
  token: string;
}

@JsonController('/password')
export default class ResetPasswordController {
  @Post('/reset')
  async create(
    @Body() body: IRequest,
    @Res() response: Response,
  ): Promise<Response> {
    const { password, token } = body;

    const resetPasswordService = container.resolve(ResetPasswordService);

    await resetPasswordService.execute({
      token,
      password,
    });

    return response.status(204).json();
  }
}
