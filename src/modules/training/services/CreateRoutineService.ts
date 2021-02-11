import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IRoutinesRepository from '@modules/training/repositories/IRoutinesRepository';
import ITrainingRepository from '@modules/training/repositories/ITrainingRepository';
import Routine from '@modules/training/infra/typeorm/entities/Routine';
import Training from '../infra/typeorm/entities/Training';
import AddAthletesToTrainingService from './AddAthletesToTrainingService';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
interface IRequest {
  title: string;
  description: string;
  training_id: string;
  trainer_id: string;
  athlete_id: string;
}

@injectable()
class CreateRoutineService {
  constructor(
    @inject('TrainingRepository')
    private trainingRepository: ITrainingRepository,


    @inject('RoutinesRepository')
    private routinesRepository: IRoutinesRepository,

    @inject('AddAthletesToTrainingService')
    private addAthletesToTrainingService: AddAthletesToTrainingService,


    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) { }

  public async execute({
    title,
    description,
    training_id,
    trainer_id,
    athlete_id
  }: IRequest): Promise<Routine> {
    let training: Training | undefined;

    if (!training_id) {
      training = await this.trainingRepository.create({
        title: '',
        description: '',
        cycle: 0,
        objective: 1,
        trainer_id
      });

      training_id = training.id;
      const athletes_ids = [athlete_id];

      await this.addAthletesToTrainingService.execute({ athletes_ids, training_id, trainer_id })
    }

    const routine = await this.routinesRepository.create({
      title,
      description,
      training_id,
    });

    await this.cacheProvider.invalidate('athletes-list');

    return routine;
  }
}

export default CreateRoutineService;
