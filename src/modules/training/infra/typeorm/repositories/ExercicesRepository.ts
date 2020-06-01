import { getRepository, Repository } from 'typeorm';

import IExercicesRepository from '@modules/training/repositories/IExercicesRepository';
import ICreateExerciceDTO from '@modules/training/dtos/ICreateExerciceDTO';

import Exercice from '@modules/training/infra/typeorm/entities/Exercice';

class ExercicesRepository implements IExercicesRepository {
  private ormRepository: Repository<Exercice>;

  constructor() {
    this.ormRepository = getRepository(Exercice);
  }

  public async create(exerciceData: ICreateExerciceDTO): Promise<Exercice> {
    const exercice = this.ormRepository.create(exerciceData);

    await this.ormRepository.save(exercice);

    return exercice;
  }

  public async save(exercice: Exercice): Promise<Exercice> {
    return this.ormRepository.save(exercice);
  }

  public async listAll(trainer_id: string): Promise<Exercice[]> {
    return this.ormRepository.find();
  }
}

export default ExercicesRepository;
