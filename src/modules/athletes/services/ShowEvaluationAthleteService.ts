import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IEvaluationRepository from '@modules/athletes/repositories/IEvaluationRepository';

import Evaluation from '@modules/athletes/infra/typeorm/entities/Evaluation';

@injectable()
class ShowEvaluationAthleteService {
  constructor(
    @inject('EvaluationRepository')
    private evaluationRepository: IEvaluationRepository,
  ) {}

  public async execute(athlete_id: string): Promise<Evaluation[]> {
    try {
      const evaluation = await this.evaluationRepository.getByAthleteId(
        athlete_id,
      );

      return evaluation;
    } catch (error) {
      throw new AppError('Fail');
    }
  }
}

export default ShowEvaluationAthleteService;
