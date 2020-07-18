import { inject, injectable } from 'tsyringe';

import IEvaluationRepository from '@modules/athletes/repositories/IEvaluationRepository';

import Evaluation from '@modules/athletes/infra/typeorm/entities/Evaluation';

@injectable()
class ShowEvaluationAthleteService {
  constructor(
    @inject('EvaluationRepository')
    private evaluationRepository: IEvaluationRepository,
  ) {}

  public async execute(athlete_id: string): Promise<Evaluation[]> {
    const evaluation = await this.evaluationRepository.getByAthleteId(
      athlete_id,
    );

    return evaluation;
  }
}

export default ShowEvaluationAthleteService;
