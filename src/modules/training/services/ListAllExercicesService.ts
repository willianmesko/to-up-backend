import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IExercicesRepository from '@modules/training/repositories/IExercicesRepository';

import Exercice from '@modules/training/infra/typeorm/entities/Exercice';

interface IRequest {
  trainer_id: string;
}

@injectable()
class ListAllExercicesService {
  constructor(
    @inject('ExercicesRepository')
    private exercicesRepository: IExercicesRepository,
  ) {}

  public async execute({ trainer_id }: IRequest): Promise<Exercice[]> {
    const exercice = this.exercicesRepository.listAll(trainer_id);

    return exercice;
  }
}

export default ListAllExercicesService;
