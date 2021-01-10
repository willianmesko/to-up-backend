import { inject, injectable } from 'tsyringe';

import ITrainingRepository from '@modules/training/repositories/ITrainingRepository';
import IRoutinesRepository from '@modules/training/repositories/IRoutinesRepository';
import Training from '@modules/training/infra/typeorm/entities/Training';
import IRoutineExerciceRepository from '@modules/training/repositories/IRoutineExerciceRepository';

interface IRequest {
  title: string;
  training_id: string;
  trainer_id: string;
}

@injectable()
class DuplicateTrainingService {
  constructor(
    @inject('TrainingRepository')
    private trainingRepository: ITrainingRepository,

    @inject('RoutinesRepository')
    private routinesRepository: IRoutinesRepository,

    @inject('RoutineExerciceRepository')
    private routineExerciceRepository: IRoutineExerciceRepository,
  ) {}

  public async execute({
    title,
    training_id,
    trainer_id,
  }: IRequest): Promise<Training | undefined> {
    const findTraining = await this.trainingRepository.findById(
      training_id,
      trainer_id,
    );

    // Procura treino a ser clonado
    if (findTraining) {
      const cloneTraining = {
        title,
        description: findTraining.description,
        cover: findTraining.cover,
        cycle: findTraining.cycle,
        objective: findTraining.objective,
        trainer_id,
      };

      // cria a copia do treino

      const clonedTraining = await this.trainingRepository.create(
        cloneTraining,
      );

      // procura e clona todas rotinas e exercicios vinculadas ao treino
      if (clonedTraining.id) {
        const cloneRoutine = await this.routinesRepository.findAll(
          findTraining.id,
        );

        if (cloneRoutine.length > 0) {
          cloneRoutine.map(async routine => {
            const clonedRoutine = await this.routinesRepository.create({
              title: routine.title,
              description: routine.description,
              training_id: clonedTraining.id,
            });

            if (clonedRoutine.id) {
              routine.routineExercice.map(async exercice => {
                await this.routineExerciceRepository.create({
                  routine_id: clonedRoutine.id,
                  exercice_id: exercice.exercice_id,
                  volume: exercice.volume,
                  repetitions: exercice.repetitions,
                  sequence: exercice.sequence,
                });
              });
            }
          });
        }
      }
      return clonedTraining;
    }
  }
}

export default DuplicateTrainingService;
