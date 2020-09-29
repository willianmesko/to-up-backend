import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { classToClass } from 'class-transformer';
import {
  JsonController,
  Res,
  UseBefore,
  Put,
  Body,
  Req,
} from 'routing-controllers';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import UpdateUserAdress from '../../../services/UpdateUserAdress';
import ICreateUserAddressDTO from '../../../dtos/ICreateUserAddressDTO';

@JsonController('/users/adress')
export default class UserAdressController {
  @Put('/')
  @UseBefore(ensureAuthenticated)
  async create(
    @Body() body: ICreateUserAddressDTO,
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<Response> {
    try {
      const { city, state, country } = body;

      const user_id = request.user.id;

      const createUserAddress = container.resolve(UpdateUserAdress);

      const user = await createUserAddress.execute({
        user_id,
        city,
        state,
        country,
      });

      return response.json(classToClass(user));
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}
