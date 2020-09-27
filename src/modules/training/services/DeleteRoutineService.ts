import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IRoutinesRepository from '@modules/training/repositories/IRoutinesRepository';

import Routine from '@modules/training/infra/typeorm/entities/Routine';

interface IRequest {
  routine_id: string;
}

@injectable()
class DeleteRoutineService {
  constructor(
    @inject('RoutinesRepository')
    private routinesRepository: IRoutinesRepository,
  ) {}

  public async execute({ routine_id }: IRequest): Promise<void> {
    try {
      await this.routinesRepository.delete(routine_id);
    } catch (error) {}
  }
}

export default DeleteRoutineService;
