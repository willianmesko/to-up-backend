import { getRepository, Repository } from 'typeorm';

import IEvaluationRepository from '@modules/athletes/repositories/IEvaluationRepository';
import ICreateEvaluationDTO from '@modules/athletes/dtos/ICreateEvaluationDTO';

import Evaluation from '@modules/athletes/infra/typeorm/entities/Evaluation';

class Evaluations implements IEvaluationRepository {
  private ormRepository: Repository<Evaluation>;

  constructor() {
    this.ormRepository = getRepository(Evaluation);
  }

  public async create(data: ICreateEvaluationDTO): Promise<Evaluation> {
    const evaluation = this.ormRepository.create(data);

    await this.ormRepository.save(evaluation);

    return evaluation;
  }

  public async getByAthleteId(athlete_id: string): Promise<Evaluation[]> {
    const evaluation = await this.ormRepository.find({
      where: { athlete_id },
    });

    return evaluation;
  }
}

export default Evaluations;
