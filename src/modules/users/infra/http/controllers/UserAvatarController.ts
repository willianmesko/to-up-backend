import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import { classToClass } from 'class-transformer';
import {
  JsonController,
  Res,
  Patch,
  UseBefore,
  Req,
} from 'routing-controllers';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import multer from 'multer';
import uploadConfig from '@config/upload';

const upload = multer(uploadConfig.multer);
@JsonController('/users')
export default class UserAvatarControllerController {
  @Patch('/avatar')
  @UseBefore(ensureAuthenticated, upload.single('avatar'))
  async update(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<Response> {
    const updateUserAvatar = container.resolve(UpdateUserAvatarService);

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    return response.json(classToClass(user));
  }
}
