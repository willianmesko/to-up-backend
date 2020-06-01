import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IExercicesRepository from '@modules/training/repositories/IExercicesRepository';

import Exercice from '@modules/training/infra/typeorm/entities/Exercice';

interface IRequest {
  name: string;
  muscle_group_id: number;
  muscle_group_name: string;
  youtube_video_id: string;
  trainer_id: string;
}

@injectable()
class CreateExerciceService {
  constructor(
    @inject('ExercicesRepository')
    private exercicesRepository: IExercicesRepository,
  ) {}

  public async execute({
    name,
    muscle_group_id,
    muscle_group_name,
    youtube_video_id,
    trainer_id,
  }: IRequest): Promise<Exercice> {
    const routine = this.exercicesRepository.create({
      name,
      muscle_group_id,
      muscle_group_name,
      youtube_video_id,
      trainer_id,
    });

    return routine;
  }
}

export default CreateExerciceService;
