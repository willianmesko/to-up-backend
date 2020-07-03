import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UpdateAthleteAvatarService from '@modules/athletes/services/UpdateAthleteAvatarService';
import { classToClass } from 'class-transformer';

export default class AthleteAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateAthleteAvatar = container.resolve(UpdateAthleteAvatarService);

    const { athlete_id } = request.params;

    const athlete = await updateAthleteAvatar.execute({
      athlete_id,
      avatarFilename: request.file.filename,
    });

    return response.json(classToClass(athlete));
  }
}
