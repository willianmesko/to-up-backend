import Training from '@modules/training/infra/typeorm/entities/Training';

export default interface ITrainingAthleteRepository {
  addAthleteToTraining(
    training_id: string,
    athlete_id: string,
  ): Promise<Training[]>;
}
