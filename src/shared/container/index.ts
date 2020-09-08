import { container } from 'tsyringe';

import '@shared/infra/provider';
import '@modules/users/providers';
import '@shared/container/providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUsersTokensRepository from '@modules/users/repositories/IUsersTokensRepository';
import UsersTokensRepository from '@modules/users/infra/typeorm/repositories/UsersTokensRepository';

import IAthletesRepository from '@modules/athletes/repositories/IAthletesRepository';
import AthletesRepository from '@modules/athletes/infra/typeorm/repositories/AthletesRepository';

import ITrainingRepository from '@modules/training/repositories/ITrainingRepository';
import TrainingRepository from '@modules/training/infra/typeorm/repositories/TrainingRepository';

import ITrainingAthleteRepository from '@modules/training/repositories/ITrainingAthleteRepository';
import TrainingAthleteRepository from '@modules/training/infra/typeorm/repositories/TrainingAthleteRepository';

import IRoutinesRepository from '@modules/training/repositories/IRoutinesRepository';
import RoutinesRepository from '@modules/training/infra/typeorm/repositories/RoutinesRepository';

import IExercicesRepository from '@modules/training/repositories/IExercicesRepository';
import ExercicesRepository from '@modules/training/infra/typeorm/repositories/ExercicesRepository';

import IRoutineExerciceRepository from '@modules/training/repositories/IRoutineExerciceRepository';
import RoutineExerciceRepository from '@modules/training/infra/typeorm/repositories/RoutineExerciceRepository';

import IEvaluationRepository from '@modules/athletes/repositories/IEvaluationRepository';
import EvaluationRepository from '@modules/athletes/infra/typeorm/repositories/EvaluationRepository';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import NotificationsRepository from '@modules/notifications/infra/typeorm/repositories/NotificationsRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUsersTokensRepository>(
  'UsersTokensRepository',
  UsersTokensRepository,
);

container.registerSingleton<IAthletesRepository>(
  'AthletesRepository',
  AthletesRepository,
);

container.registerSingleton<ITrainingRepository>(
  'TrainingRepository',
  TrainingRepository,
);

container.registerSingleton<IRoutinesRepository>(
  'RoutinesRepository',
  RoutinesRepository,
);

container.registerSingleton<IExercicesRepository>(
  'ExercicesRepository',
  ExercicesRepository,
);

container.registerSingleton<IRoutineExerciceRepository>(
  'RoutineExerciceRepository',
  RoutineExerciceRepository,
);

container.registerSingleton<ITrainingAthleteRepository>(
  'TrainingAthleteRepository',
  TrainingAthleteRepository,
);

container.registerSingleton<IEvaluationRepository>(
  'EvaluationRepository',
  EvaluationRepository,
);

container.registerSingleton<INotificationsRepository>(
  'NotificationsRepository',
  NotificationsRepository,
);
