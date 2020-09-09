import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import { JsonController, Res, Post, UseBefore, Req } from 'routing-controllers';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AddAthletesToTrainingService from '@modules/training/services/AddAthletesToTrainingService';

@JsonController('/training')
@UseBefore(ensureAuthenticated)
export default class TrainingAthletesController {
  @Post('/athletes')
  async create(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<Response> {
    try {
      const { athletes_ids, training_id } = request.body;

      const addAthletesToTraining = container.resolve(
        AddAthletesToTrainingService,
      );

      const training = await addAthletesToTraining.execute({
        athletes_ids,
        training_id,
        trainer_id: request.user.id,
      });

      return response.json(classToClass(training));
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
