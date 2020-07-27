import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ITrainingRepository from '@modules/training/repositories/ITrainingRepository';
import IAthletesRepository from '@modules/athletes/repositories/IAthletesRepository';

import Training from '@modules/training/infra/typeorm/entities/Training';

interface IRequest {
  athletes_ids: any[];
  training_id: string;
  trainer_id: string;
}

@injectable()
class AddAthletesToTrainingService {
  constructor(
    @inject('TrainingRepository')
    private trainingRepository: ITrainingRepository,

    @inject('AthletesRepository')
    private athletesRepository: IAthletesRepository,
  ) {}

  public async execute({
    athletes_ids,
    training_id,
    trainer_id,
  }: IRequest): Promise<void> {
    const training = await this.trainingRepository.findById(
      training_id,
      trainer_id,
    );

    athletes_ids.map(async athlete_id => {
      const athlete = await this.athletesRepository.findById(athlete_id);

      athlete.trainings = [training];

      this.athletesRepository.create(athlete);
    });
  }
}

export default AddAthletesToTrainingService;
