import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ITrainingRepository from '@modules/training/repositories/ITrainingRepository';

import Training from '@modules/training/infra/typeorm/entities/Training';

interface IRequest {
  title: string;
  description: string;
  trainer_id: string;
}

@injectable()
class CreateTrainingService {
  constructor(
    @inject('TrainingRepository')
    private trainingRepository: ITrainingRepository,
  ) {}

  public async execute({
    title,
    description,
    trainer_id,
  }: IRequest): Promise<Training> {
    const training = this.trainingRepository.create({
      title,
      description,
      trainer_id,
    });

    return training;
  }
}

export default CreateTrainingService;
