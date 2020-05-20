import { inject, injectable } from 'tsyringe';

// import AppError from '@shared/errors/AppError';
import IAthletesRepository from '@modules/athletes/repositories/IAthletesRepository';
// import IUsersRepository from '@modules/users/repositories/IUsersRepository';
// import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
// import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import Athlete from '@modules/athletes/infra/typeorm/entities/Athlete';

interface IRequest {
  name: string;
  email: string;
  password: string;
  trainer_id: string;
  sexo: boolean;
  age: number;
  body_mass: number;
  stature: number;
  aerobic_profile: number;
  training_level: number;
  physical_activity: number;
  objective: number;
  basal_metabolic_rate: number;
  spent_daily_train: number;
  mass_muscle: number;
  mass_fat: number;
  personal_profile: number;
  imc: number;
}

@injectable()
class CreateAthleteService {
  constructor(
    @inject('AthletesRepository')
    private athletesRepository: IAthletesRepository,
  ) {}

  public async execute({
    name,
    email,
    password,
    trainer_id,
    sexo,
    age,
    body_mass,
    stature,
    aerobic_profile,
    training_level,
    physical_activity,
    objective,
    basal_metabolic_rate,
    spent_daily_train,
    mass_muscle,
    mass_fat,
    personal_profile,
    imc,
  }: IRequest): Promise<Athlete> {
    const athlete = this.athletesRepository.create({
      name,
      email,
      password,
      trainer_id,
      sexo,
      age,
      body_mass,
      stature,
      aerobic_profile,
      training_level,
      physical_activity,
      objective,
      basal_metabolic_rate,
      spent_daily_train,
      mass_muscle,
      mass_fat,
      personal_profile,
      imc,
    });

    console.log(name);

    return athlete;
  }
}

export default CreateAthleteService;
