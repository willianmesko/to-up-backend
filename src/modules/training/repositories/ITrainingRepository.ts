import Training from '@modules/training/infra/typeorm/entities/Training';
import ICreateTrainingDTO from '@modules/training/dtos/ICreateTrainingDTO';

export default interface ITrainingRepository {
  findAllByTrainerId(trainer_id: string): Promise<Training[]>;
  findById(
    training_id: string,
    trainer_id: string,
  ): Promise<Training | undefined>;
  create(trainingData: ICreateTrainingDTO): Promise<Training | undefined>;
  save(training: Training): Promise<Training>;
}
