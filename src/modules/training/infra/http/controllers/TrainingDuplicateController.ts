import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import { JsonController, Res, Post, UseBefore, Req } from 'routing-controllers';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import DuplicateTrainingService from '@modules/training/services/DuplicateTrainingService';

@JsonController('/training')
@UseBefore(ensureAuthenticated)
export default class TrainingDuplicateController {
  @Post('/duplicate/:training_id')
  async create(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<Response> {
    try {
      const { title } = request.body;
      const { training_id } = request.params;
      const duplicateTraining = container.resolve(DuplicateTrainingService);

      const training = await duplicateTraining.execute({
        training_id,
        title,
        trainer_id: request.user.id,
      });

      return response.json(classToClass(training));
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
