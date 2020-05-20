import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IRoutinesRepository from '@modules/training/repositories/IRoutinesRepository';

import Routine from '@modules/training/infra/typeorm/entities/Routine';

interface IRequest {
  title: string;
  description: string;
  training_id: string;
}

@injectable()
class CreateRoutineService {
  constructor(
    @inject('RoutinesRepository')
    private routinesRepository: IRoutinesRepository,
  ) {}

  public async execute({
    title,
    description,
    training_id,
  }: IRequest): Promise<Routine> {
    const routine = this.routinesRepository.create({
      title,
      description,
      training_id,
    });

    return routine;
  }
}

export default CreateRoutineService;
