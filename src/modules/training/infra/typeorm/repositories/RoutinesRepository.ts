import { getRepository, Repository } from 'typeorm';

import IRoutinesRepository from '@modules/training/repositories/IRoutinesRepository';
import ICreateRoutineDTO from '@modules/training/dtos/ICreateRoutineDTO';

import Routine from '@modules/training/infra/typeorm/entities/Routine';

class RoutinesRepository implements IRoutinesRepository {
  private ormRepository: Repository<Routine>;

  constructor() {
    this.ormRepository = getRepository(Routine);
  }

  public async create(routineData: ICreateRoutineDTO): Promise<Routine> {
    const routine = this.ormRepository.create(routineData);

    return this.ormRepository.save(routine);
  }

  public async save(routine: Routine): Promise<Routine> {
    return this.ormRepository.save(routine);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository
      .createQueryBuilder()
      .delete()
      .from(Routine)
      .where('id = :id', { id })
      .execute();
  }

  public async findAll(training_id: string): Promise<Routine[]> {
    const routines = await this.ormRepository.find({
      where: { training_id },
      relations: ['routineExercice'],
    });

    return routines;
  }
}

export default RoutinesRepository;
