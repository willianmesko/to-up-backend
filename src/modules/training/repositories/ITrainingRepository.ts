import Training from '@modules/training/infra/typeorm/entities/Training';
import Athlete from '@modules/athletes/infra/typeorm/entities/Athlete';
import ICreateTrainingDTO from '@modules/training/dtos/ICreateTrainingDTO';

export default interface ITrainingRepository {
  findAllByTrainerId(trainer_id: string): Promise<Training[] | undefined>;
  findById(
    training_id: string,
    trainer_id: string,
  ): Promise<Training | undefined>;
  findByAthleteId(id: string): Promise<Athlete | undefined>;
  create(trainingData: ICreateTrainingDTO): Promise<Training>;
  save(training: Training): Promise<Training>;
  delete(training_id: string): Promise<void>;
}
