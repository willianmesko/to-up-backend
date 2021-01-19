import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ITrainingRepository from '@modules/training/repositories/ITrainingRepository';

import Training from '@modules/training/infra/typeorm/entities/Training';

interface IRequest {
  trainer_id: string;
}

@injectable()
class ListAllTrainerTraining {
  constructor(
    @inject('TrainingRepository')
    private trainingRepository: ITrainingRepository,
  ) {}

  public async execute({
    trainer_id,
  }: IRequest): Promise<Training[] | undefined> {
    const training = await this.trainingRepository.findAllByTrainerId(
      trainer_id,
    );

    if (training?.length === 0) {
      throw new AppError('Nenhum treino cadastrado');
    }

    return training;
  }
}

export default ListAllTrainerTraining;
