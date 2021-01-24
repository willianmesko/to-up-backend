import { inject, injectable } from 'tsyringe';
import crypto from 'crypto';
import AppError from '@shared/errors/AppError';
import IAthletesRepository from '@modules/athletes/repositories/IAthletesRepository';

import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import Athlete from '@modules/athletes/infra/typeorm/entities/Athlete';

interface IRequest {
  name: string;
  surname: string;
  password: string;
  email: string;
  trainer_id?: string | undefined;
  avatar?: string;
  ethnicity?: number;
  sexo: number;
  age?: number;
  body_mass?: number;
  stature?: number;
  aerobic_profile?: number;
  training_level?: number;
  physical_activity?: number;
  objective?: number;
}

@injectable()
class CreateAthleteService {
  constructor(
    @inject('AthletesRepository')
    private athletesRepository: IAthletesRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,

  ) { }

  public async execute({
    name,
    surname,
    email,
    password,
    trainer_id,
    ethnicity,
    sexo,
    age,
    body_mass,
    stature,
    aerobic_profile,
    training_level,
    physical_activity,
    objective,
  }: IRequest): Promise<Athlete> {
    // const checkAthleteExists = await this.athletesRepository.findByEmail(email);
    // console.log(checkAthleteExists)
    // if (checkAthleteExists) {
    //   throw new AppError('Email já cadastrado');
    // }


    // function calculeBasalMetabolicRate(): number | undefined {
    //   // 0 = MASCULINO
    //   // 1 = FEMININO
    //   let result;
    //   if (sexo === 0) {
    //     result = 9.99 * body_mass + 6.25 * stature - 4.92 * age + 5;
    //   }
    //   if (sexo === 1) {
    //     result = 9.99 * body_mass + 6.25 * stature - 4.92 * age - 161;
    //   }
    //   return result;
    // }

    // function calculeImc(): number | undefined {
    //   return body_mass / (((stature / 100) * stature) / 100);
    // }

    const signUpAthlete = !password ? '12345' : password;
    const hashedPassword = await this.hashProvider.generateHash(signUpAthlete);

    const athlete = await this.athletesRepository.create({
      name,
      surname,
      email,
      password: hashedPassword,
      ethnicity: Number(ethnicity),
      trainer_id,
      sexo: Number(sexo),
      age: Number(age),
      body_mass: Number(body_mass),
      stature: Number(stature),
      aerobic_profile: Number(stature),
      training_level: Number(stature),
      physical_activity: Number(stature),
      objective: Number(stature),
    });

    await this.cacheProvider.invalidate('athletes-list');
    return athlete;
  }
}

export default CreateAthleteService;
