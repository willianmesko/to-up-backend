import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ITrainingRepository from '@modules/training/repositories/ITrainingRepository';

import Training from '@modules/training/infra/typeorm/entities/Training';

interface IRequest {
  training_id: string;
  trainer_id: string;
}

@injectable()
class ShowTrainerTraining {
  constructor(
    @inject('TrainingRepository')
    private trainingRepository: ITrainingRepository,
  ) {}

  public async execute({
    training_id,
    trainer_id,
  }: IRequest): Promise<Training | undefined> {
    const training = await this.trainingRepository.findById(
      training_id,
      trainer_id,
    );

    if (!training) {
      throw new AppError('Treino não encontrado');
    }

    return training;
  }
}

export default ShowTrainerTraining;
