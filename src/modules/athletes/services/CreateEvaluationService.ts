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
  subscapular?: number;
  tricipital?: number;
  athlete_sexo: number;
  athlete_ethnicity: number;
  breastplate?: number;
  axilar?: number;
  thigh?: number;
  suprailiac?: number;
  abdominal?: number;
  chest?: number;
  waist?: number;
  leg?: number;
  hip?: number;
  right_arm?: number;
  left_arm?: number;
  right_thigh?: number;
  left_thigh?: number;
  right_leg?: number;
  abdomen?: number;
  left_leg?: number;
  observation?: string;
  left_forearm?: number;
  right_forearm?: number;
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

    //(CAG): CAG= PerimetroDoBraçoDireito-(3,14xDobracutaneatríceps) / 10
    // CTG = PerimetroCoxaDireita-(3,14xDobraCutaneaCoxa) / 10
    // CCG = PerimetroPernaDireita-(3,14xDobraCutaneaPerna) / 10
    const cag = right_arm - (3.14 * tricipital) / 10;
    const ctg = right_thigh - (3.14 * thigh) / 10;
    const ccg = right_leg - (3.14 * thigh) / 10;

    const total_skin_folds: number =
      subscapular +
      tricipital +
      breastplate +
      abdominal +
      axilar +
      suprailiac +
      thigh;

    const body_density: number | undefined = () => {
      //MASCULINO
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
    };

    const mass_muscle =
      athlete_height *
        (0.00744 * cag ** 2 + 0.00088 * ctg ** 2 + 0.00441 * ccg ** 2) +
      2.4 * athlete_sexo -
      0.048 * athlete_age +
      athlete_ethnicity +
      7.8;

    const body_fat_percentage: number = 4.95 * body_density() - 4.5;

    const body_muscle_percentage: number = mass_muscle / athlete_weight;

    const fat_weight = athlete_weight * body_fat_percentage;

    const lean_body_mass = athlete_weight - fat_weight;

    const tableAges = Array.from({ length: 65 }, (_, index) => index + 1);
    const tableBodyFatPercentage = Array.from(
      { length: 40 },
      (_, index) => index + 1,
    );

    //Cria tabela baseada no estudo da formula para o sexo Feminino
    const tableClassification = tableAges.map((age, _) => {
      if (age >= 18 && age <= 25) {
        return {
          classification: tableBodyFatPercentage.map((percentage, _) => {
            if (percentage < 13) return 'Muito Baixo';
            if (percentage >= 13 && percentage <= 16) return 'Exclente';
            if (percentage >= 17 && percentage <= 19) return 'Muito Bom';
            if (percentage >= 20 && percentage <= 22) return 'Bom';
            if (percentage >= 23 && percentage <= 25) return 'Adequado';
            if (percentage >= 26 && percentage <= 28) return 'Moderamente alto';
            if (percentage >= 29 && percentage <= 31) return 'Alto';
            if (percentage >= 32) return 'Muito alto';
          }),
        };
      }

      if (age >= 26 && age <= 35) {
        return {
          classification: tableBodyFatPercentage.map((percentage, _) => {
            if (percentage < 14) return 'Muito Baixo';
            if (percentage >= 14 && percentage <= 16) return 'Exclente';
            if (percentage >= 17 && percentage <= 20) return 'Muito Bom';
            if (percentage >= 21 && percentage <= 23) return 'Bom';
            if (percentage >= 24 && percentage <= 25) return 'Adequado';
            if (percentage >= 26 && percentage <= 29) return 'Moderamente alto';
            if (percentage >= 30 && percentage <= 33) return 'Alto';
            if (percentage >= 34) return 'Muito alto';
          }),
        };
      }

      if (age >= 36 && age <= 45) {
        return {
          classification: tableBodyFatPercentage.map((percentage, _) => {
            if (percentage < 16) return 'Muito Baixo';
            if (percentage >= 16 && percentage <= 19) return 'Exclente';
            if (percentage >= 20 && percentage <= 23) return 'Muito Bom';
            if (percentage >= 24 && percentage <= 26) return 'Bom';
            if (percentage >= 27 && percentage <= 29) return 'Adequado';
            if (percentage >= 30 && percentage <= 32) return 'Moderamente alto';
            if (percentage >= 33 && percentage <= 36) return 'Alto';
            if (percentage >= 37) return 'Muito alto';
          }),
        };
      }

      if (age >= 46 && age <= 55) {
        return {
          classification: tableBodyFatPercentage.map((percentage, _) => {
            if (percentage < 17) return 'Muito Baixo';
            if (percentage >= 17 && percentage <= 21) return 'Exclente';
            if (percentage >= 22 && percentage <= 25) return 'Muito Bom';
            if (percentage >= 26 && percentage <= 28) return 'Bom';
            if (percentage >= 29 && percentage <= 31) return 'Adequado';
            if (percentage >= 32 && percentage <= 34) return 'Moderamente alto';
            if (percentage >= 35 && percentage <= 38) return 'Alto';
            if (percentage >= 39) return 'Muito alto';
          }),
        };
      }

      if (age >= 56 && age <= 65) {
        return {
          classification: tableBodyFatPercentage.map((percentage, _) => {
            if (percentage < 18) return 'Muito Baixo';
            if (percentage >= 18 && percentage <= 22) return 'Exclente';
            if (percentage >= 23 && percentage <= 26) return 'Muito Bom';
            if (percentage >= 27 && percentage <= 29) return 'Bom';
            if (percentage >= 30 && percentage <= 32) return 'Adequado';
            if (percentage >= 33 && percentage <= 35) return 'Moderamente alto';
            if (percentage >= 36 && percentage <= 38) return 'Alto';
            if (percentage >= 39) return 'Muito alto';
          }),
        };
      }
    });
    console.log(body_fat_percentage);
    console.log(tableClassification[athlete_age]['classification'][15]);
    const evaluation = this.evaluationRepository.create({
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
      body_density: body_density(),
      mass_muscle,
      body_fat_percentage,
      body_muscle_percentage,
      fat_weight,
      lean_body_mass,
      classification: tableClassification[athlete_age]['classification'][15],
      desired_fat_percentage: 15,
      ideal_body_weight: 80,
    });

    return evaluation;
  }
}

export default CreateEvaluationService;
