import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { classToClass } from 'class-transformer';



import UpdateUserAdress from '../../../services/UpdateUserAdress';
import ICreateUserAddressDTO from '../../../dtos/ICreateUserAddressDTO';

export default class UserAdressController {


  async put(

    request: Request,
    response: Response,
  ): Promise<Response> {
    try {
      const { city, state, country } = request.body;

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
