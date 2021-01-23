import { getRepository, Repository } from 'typeorm';

import ITrainingAthleteRepository from '@modules/training/repositories/ITrainingAthleteRepository';

import Training from '@modules/training/infra/typeorm/entities/Training';

class TrainingAthleteRepository implements ITrainingAthleteRepository {
  private ormRepository: Repository<Training>;

  constructor() {
    this.ormRepository = getRepository(Training);
  }

  public async addAthleteToTraining(
    training_id: string,
    athlete_id: string,
  ): Promise<Training[]> {
    {

    }
  }
}

export default TrainingAthleteRepository;
