import { inject, injectable } from 'tsyringe';

import ITrainingRepository from '@modules/training/repositories/ITrainingRepository';
import IRoutinesRepository from '@modules/training/repositories/IRoutinesRepository';
import Training from '@modules/training/infra/typeorm/entities/Training';

interface IRequest {
  title: string;
  description: string;
  cycle: number;
  objective: number;
  trainer_id: string;
}

@injectable()
class CreateTrainingService {
  constructor(
    @inject('TrainingRepository')
    private trainingRepository: ITrainingRepository,

    @inject('RoutinesRepository')
    private routinesRepository: IRoutinesRepository,
  ) {}

  public async execute({
    title,
    description,
    trainer_id,
    cycle,
    objective,
  }: IRequest): Promise<Training> {
    const training = await this.trainingRepository.create({
      title,
      cycle,
      objective,
      description,
      trainer_id,
    });

    if (training) {
      // CICLOS
      // 2 A -B
      // 3 A - B C
      // 4 A B C D
      // 5 A B C D E
      // 6 A B C D E F

      if (cycle > 1) {
        for (let i = 1; i <= cycle; i++) {
          this.routinesRepository.create({
            title: 'rotina',
            training_id: training.id,
            description: '',
          });
        }
      }
    }
    return training;
  }
}

export default CreateTrainingService;
