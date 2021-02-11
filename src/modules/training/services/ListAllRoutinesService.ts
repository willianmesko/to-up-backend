import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IRoutinesRepository from '@modules/training/repositories/IRoutinesRepository';

import Routine from '@modules/training/infra/typeorm/entities/Routine';

interface IRequest {
  training_id: string;
}

@injectable()
class ListAllRoutinesService {
  constructor(
    @inject('RoutinesRepository')
    private routinesRepository: IRoutinesRepository,
  ) { }

  public async execute({
    training_id,
  }: IRequest): Promise<Routine[] | undefined> {
    const routines = await this.routinesRepository.findAll(training_id);

    console.log(training_id)
    return routines;
  }
}

export default ListAllRoutinesService;
