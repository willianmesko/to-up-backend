import { getRepository, Repository } from 'typeorm';

import IRoutineExerciceRepository from '@modules/training/repositories/IRoutineExerciceRepository';
import ICreateRoutineExerciceDTO from '@modules/training/dtos/ICreateRoutineExerciceDTO';

import RoutineExercice from '@modules/training/infra/typeorm/entities/RoutineExercice';

class RoutineExerciceRepository implements IRoutineExerciceRepository {
  private ormRepository: Repository<RoutineExercice>;

  constructor() {
    this.ormRepository = getRepository(RoutineExercice);
  }

  public async create(
    routineExerciceData: ICreateRoutineExerciceDTO,
  ): Promise<RoutineExercice> {
    const routine_exercice = this.ormRepository.create(routineExerciceData);

    await this.ormRepository.save(routine_exercice);

    return routine_exercice;
  }

  public async save(
    routineExercice: RoutineExercice,
  ): Promise<RoutineExercice> {
    return this.ormRepository.save(routineExercice);
  }

  public async find(id: string): Promise<RoutineExercice | undefined> {
    const routineExercice = await this.ormRepository.findOne({
      where: { id },
    });

    return routineExercice;
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository
      .createQueryBuilder()
      .delete()
      .from(RoutineExercice)
      .where('exercice_id = :id', { id })
      .execute();
  }
}

export default RoutineExerciceRepository;
