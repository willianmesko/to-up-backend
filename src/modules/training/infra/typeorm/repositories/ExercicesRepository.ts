import { getRepository, Repository } from 'typeorm';

import IExercicesRepository from '@modules/training/repositories/IExercicesRepository';
import ICreateExerciceDTO from '@modules/training/dtos/ICreateExerciceDTO';
import IFindExerciceDTO from '@modules/training/dtos/IFindExerciceDTO';

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

  public async findByExerciceByNameAndTrainer({
    exercice_name,
    trainer_id,
  }: IFindExerciceDTO): Promise<Exercice | undefined> {
    return this.ormRepository.findOne({
      where: { trainer_id, name: exercice_name },
    });
  }

  public async save(exercice: Exercice): Promise<Exercice> {
    return this.ormRepository.save(exercice);
  }

  public async listAll(trainer_id: string): Promise<Exercice[]> {
    return this.ormRepository.find({
      where: { trainer_id },
    });
  }
}

export default ExercicesRepository;
