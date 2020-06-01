import { inject, injectable } from 'tsyringe';

import ITrainingRepository from '@modules/training/repositories/ITrainingRepository';

import Training from '@modules/training/infra/typeorm/entities/Training';

interface IRequest {
  title: string;
  description: string;
  difficulty: number;
  objective: number;
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
    difficulty,
    objective,
  }: IRequest): Promise<Training> {
    const training = await this.trainingRepository.create({
      title,
      difficulty,
      objective,
      description,
      trainer_id,
    });

    return training;
  }
}

export default CreateTrainingService;
