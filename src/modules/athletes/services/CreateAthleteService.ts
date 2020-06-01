import { inject, injectable } from 'tsyringe';
import crypto from 'crypto';
import AppError from '@shared/errors/AppError';
import IAthletesRepository from '@modules/athletes/repositories/IAthletesRepository';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
// import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import Athlete from '@modules/athletes/infra/typeorm/entities/Athlete';

interface IRequest {
  name: string;
  email: string;
  trainer_id: string;

  sexo: number;
  age: number;
  body_mass: number;
  stature: number;
  aerobic_profile: number;
  training_level: number;
  physical_activity: number;
  objective: number;
}

@injectable()
class CreateAthleteService {
  constructor(
    @inject('AthletesRepository')
    private athletesRepository: IAthletesRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    name,
    email,
    trainer_id,

    sexo,
    age,
    body_mass,
    stature,
    aerobic_profile,
    training_level,
    physical_activity,
    objective,
  }: IRequest): Promise<Athlete> {
    const checkAthleteExists = await this.athletesRepository.findByEmail(email);

    if (checkAthleteExists) {
      throw new AppError('Aluno já cadastrado');
    }

    const password = crypto.randomBytes(6).toString('HEX');

    function calculeBasalMetabolicRate(): number | undefined {
      // 0 = MASCULINO
      // 1 = FEMININO
      let result;
      if (sexo === 0) {
        result = 9.99 * body_mass + 6.25 * stature - 4.92 * age + 5;
      }
      if (sexo === 1) {
        result = 9.99 * body_mass + 6.25 * stature - 4.92 * age - 161;
      }
      return result;
    }

    function calculeImc(): number | undefined {
      return body_mass / (((stature / 100) * stature) / 100);
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const athlete = this.athletesRepository.create({
      name,
      email,
      password: hashedPassword,

      trainer_id,
      sexo,
      age,
      body_mass,
      stature,
      aerobic_profile,
      training_level,
      physical_activity,
      objective,
      basal_metabolic_rate: calculeBasalMetabolicRate(),

      imc: calculeImc(),
    });

    return athlete;
  }
}

export default CreateAthleteService;
