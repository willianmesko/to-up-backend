import { inject, injectable } from 'tsyringe';

import ITrainingRepository from '@modules/training/repositories/ITrainingRepository';
import IRoutinesRepository from '@modules/training/repositories/IRoutinesRepository';
import Training from '@modules/training/infra/typeorm/entities/Training';

interface IRequest {
  training_id: string;
}

@injectable()
class DeleteTrainingService {
  constructor(
    @inject('TrainingRepository')
    private trainingRepository: ITrainingRepository,
  ) { }

  public async execute({ training_id }: IRequest): Promise<void> {
    try {

      await this.trainingRepository.delete(training_id);
    } catch (error) { }
  }
}

export default DeleteTrainingService;
