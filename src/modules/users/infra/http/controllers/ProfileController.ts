import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import {
  JsonController,
  Body,
  Res,
  Get,
  Post,
  UseBefore,
  Req,
  Put,
} from 'routing-controllers';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

interface IRequest {
  name: string;
  email: string;
  password: string;
  old_password: string;
}

@JsonController('/profile')
@UseBefore(ensureAuthenticated)
export default class ProfileController {
  @Post('/')
  async show(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<Response> {
    const user_id = request.user.id;

    const showProfile = container.resolve(ShowProfileService);

    const user = await showProfile.execute({ user_id });

    return response.json(classToClass(user));
  }

  @Put('/')
  async update(
    @Body() body: IRequest,
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<Response> {
    try {
      const user_id = request.user.id;
      const { name, email, old_password, password } = body;

      const updateProfile = container.resolve(UpdateProfileService);

      const user = await updateProfile.execute({
        user_id,
        name,
        email,
        old_password,
        password,
      });

      return response.json(classToClass(user));
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
