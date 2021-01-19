import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IEvaluationRepository from '@modules/athletes/repositories/IEvaluationRepository';

import Evaluation from '@modules/athletes/infra/typeorm/entities/Evaluation';

interface IRequest {
  type: number;
  type_title: string;
  date: Date;
  athlete_age: number;
  athlete_weight: number;
  athlete_height: number;
  subscapular: number;
  tricipital: number;
  athlete_sexo: number;
  athlete_ethnicity: number;
  breastplate: number;
  axilar: number;
  thigh: number;
  suprailiac: number;
  abdominal: number;
  chest: number;
  waist: number;
  leg: number;
  hip: number;
  right_arm: number;
  left_arm: number;
  right_thigh: number;
  left_thigh: number;
  right_leg: number;
  abdomen: number;
  left_leg: number;
  observation?: string;
  left_forearm: number;
  right_forearm: number;
  athlete_id: string;
  trainer_id: string;
}

@injectable()
class CreateEvaluationService {
  constructor(
    @inject('EvaluationRepository')
    private evaluationRepository: IEvaluationRepository,
  ) {}

  public async execute({
    type,
    type_title,
    date,
    athlete_sexo,
    athlete_ethnicity,
    athlete_age,
    athlete_weight,
    athlete_height,
    subscapular,
    tricipital,
    breastplate,
    axilar,
    thigh,
    suprailiac,
    abdominal,
    chest,
    waist,
    hip,
    leg,
    right_arm,
    left_arm,
    right_thigh,
    abdomen,
    left_thigh,
    right_leg,
    left_leg,
    observation,
    left_forearm,
    right_forearm,
    athlete_id,
    trainer_id,
  }: IRequest): Promise<Evaluation> {
    // const checkAthleteExists = await this.athletesRepository.findByEmail(email);

    // if (checkAthleteExists) {
    //   throw new AppError('Aluno já cadastrado');
    // }

    // (CAG): CAG= PerimetroDoBraçoDireito-(3,14xDobracutaneatríceps) / 10
    // CTG = PerimetroCoxaDireita-(3,14xDobraCutaneaCoxa) / 10
    // CCG = PerimetroPernaDireita-(3,14xDobraCutaneaPerna) / 10
    const cag = right_arm - (3.14 * tricipital) / 10;

    const ctg = right_thigh - (3.14 * thigh) / 10;
    const ccg = right_leg - (3.14 * thigh) / 10;

    const total_skin_folds: number | undefined =
      subscapular +
      tricipital +
      breastplate +
      abdominal +
      axilar +
      suprailiac +
      thigh;

    const mass_muscle: number = this.mass_muscle(
      athlete_height,
      athlete_sexo,
      athlete_age,
      athlete_ethnicity,
      cag,
      ctg,
      ccg,
    );

    const body_density: number = this.body_density(
      athlete_sexo,
      athlete_age,
      total_skin_folds,
    );

    const body_fat_percentage: number = 4.95 * body_density - 4.5;

    const body_muscle_percentage: number = mass_muscle / athlete_weight;

    const fat_weight = athlete_weight * body_fat_percentage;

    const lean_body_mass = athlete_weight - fat_weight;

    console.log(body_fat_percentage);
    console.log(body_muscle_percentage);
    console.log(fat_weight);
    console.log(lean_body_mass);

    try {
      const evaluation = await this.evaluationRepository.create({
        type,
        type_title,
        date,
        athlete_age,
        athlete_weight,
        athlete_height,
        athlete_ethnicity,
        athlete_sexo,
        subscapular,
        tricipital,
        breastplate,
        axilar,
        thigh,
        suprailiac,
        abdominal,
        chest,
        waist,
        hip,
        right_arm,
        left_arm,
        right_thigh,
        left_thigh,
        abdomen,
        right_leg,
        left_leg,
        observation,
        left_forearm,
        right_forearm,
        total_skin_folds,
        athlete_id,
        trainer_id,
        body_density,
        mass_muscle,
        body_fat_percentage,
        body_muscle_percentage,
        fat_weight,
        lean_body_mass,
        classification: 'bom',
        desired_fat_percentage: 15,
        ideal_body_weight: '80',
      });

      return evaluation;
    } catch (error) {}
  }

  private body_density(
    athlete_sexo: number,
    athlete_age: number,
    total_skin_folds: number,
  ): number {
    if (athlete_sexo === 0) {
      return (
        1.112 -
        0.00043499 * total_skin_folds +
        0.00000055 * (total_skin_folds * total_skin_folds) -
        0.00012882 * athlete_age
      );
    }
    //FEMININO
    if (athlete_sexo === 1) {
      return (
        1.097 -
        0.00046971 * total_skin_folds +
        0.00000056 * (total_skin_folds * total_skin_folds) -
        0.00012828 * athlete_age
      );
    }

    return 0;
  }
  private mass_muscle(
    athlete_height: number,
    athlete_sexo: number,
    athlete_age: number,
    athlete_ethnicity: number,
    cag: number,
    ctg: number,
    ccg: number,
  ): number {
    return (
      athlete_height *
        (0.00744 * cag ** 2 + 0.00088 * ctg ** 2 + 0.00441 * ccg ** 2) +
      2.4 * athlete_sexo -
      0.048 * athlete_age +
      athlete_ethnicity +
      7.8
    );
  }
}

export default CreateEvaluationService;
