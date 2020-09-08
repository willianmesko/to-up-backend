import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UpdateAthleteAvatarService from '@modules/athletes/services/UpdateAthleteAvatarService';
import { classToClass } from 'class-transformer';
import {
  JsonController,
  UseBefore,
  Patch,
  Req,
  Res,
} from 'routing-controllers';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import multer from 'multer';
import uploadConfig from '@config/upload';

const upload = multer(uploadConfig.multer);
@JsonController('/athletes')
@UseBefore(ensureAuthenticated, upload.single('avatar'))
export default class AthleteAvatarController {
  @Patch('/avatar/:athlete_id')
  async update(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<Response> {
    const updateAthleteAvatar = container.resolve(UpdateAthleteAvatarService);

    const { athlete_id } = request.params;

    const athlete = await updateAthleteAvatar.execute({
      athlete_id,
      avatarFilename: request.file.filename,
    });

    return response.json(classToClass(athlete));
  }
}
