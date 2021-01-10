import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IExercicesRepository from '@modules/training/repositories/IExercicesRepository';

import Exercice from '@modules/training/infra/typeorm/entities/Exercice';

interface IRequest {
  name: string;
  muscle_group_id: number;
  muscle_group_name: string;
  calorie: number;
  duration: number;
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
    calorie,
    duration,
    youtube_video_id,
    trainer_id,
  }: IRequest): Promise<Exercice> {
    const existExercice = await this.exercicesRepository.findByExerciceByNameAndTrainer(
      { exercice_name: name, trainer_id },
    );

    if (existExercice) {
      throw new AppError('Exercicio já cadastrado');
    }

    console.log(youtube_video_id);
    const exercice = await this.exercicesRepository.create({
      name,
      muscle_group_id,
      muscle_group_name,
      calorie,
      duration,
      youtube_video_id,
      trainer_id,
    });

    return exercice;
  }
}

export default CreateExerciceService;
