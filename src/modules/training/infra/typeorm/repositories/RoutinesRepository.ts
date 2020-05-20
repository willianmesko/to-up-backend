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

    await this.ormRepository.save(routineData);

    return routine;
  }

  public async save(routine: Routine): Promise<Routine> {
    return this.ormRepository.save(routine);
  }
}

export default RoutinesRepository;
