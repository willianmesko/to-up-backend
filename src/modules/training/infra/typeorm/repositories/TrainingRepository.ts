import { getRepository, Repository } from 'typeorm';

import ITrainingRepository from '@modules/training/repositories/ITrainingRepository';
import ICreateTrainingDTO from '@modules/training/dtos/ICreateTrainingDTO';

import Training from '@modules/training/infra/typeorm/entities/Training';

class TrainingRepository implements ITrainingRepository {
  private ormRepository: Repository<Training>;

  constructor() {
    this.ormRepository = getRepository(Training);
  }

  public async findAllByTrainerId(
    trainer_id: string,
  ): Promise<Training[] | undefined> {
    const training = await this.ormRepository.find({
      where: { trainer_id },
      relations: ['routines'],
    });

    return training;
  }

  public async findById(
    training_id: string,
    trainer_id: string,
  ): Promise<Training | undefined> {
    const training = await this.ormRepository.findOne({
      where: { id: training_id, trainer_id },
      relations: ['routines'],
    });

    return training;
  }

  public async create(
    trainingData: ICreateTrainingDTO,
  ): Promise<Training | undefined> {
    const training = this.ormRepository.create(trainingData);

    await this.ormRepository.save(training);

    return training;
  }

  public async save(training: Training): Promise<Training> {
    return this.ormRepository.save(training);
  }
}

export default TrainingRepository;
