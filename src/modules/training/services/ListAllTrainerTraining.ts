import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ITrainingRepository from '@modules/training/repositories/ITrainingRepository';

import Training from '@modules/training/infra/typeorm/entities/Training';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { request } from 'express';

interface IRequest {
  trainer_id: string;
}

@injectable()
class ListAllTrainerTraining {
  constructor(
    @inject('TrainingRepository')
    private trainingRepository: ITrainingRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) { }

  public async execute({
    trainer_id,
  }: IRequest): Promise<Training[]> {

    let workouts = await this.cacheProvider.recover<Training[]>('workout-list');
    if (!workouts) {
      workouts = await this.trainingRepository.findAllByTrainerId(trainer_id);

      this.cacheProvider.save('workout-list', workouts)
    }

    return workouts;


  }
}

export default ListAllTrainerTraining;
