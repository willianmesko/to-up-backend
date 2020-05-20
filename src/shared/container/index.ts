import { container } from 'tsyringe';

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

import IRoutinesRepository from '@modules/training/repositories/IRoutinesRepository';
import RoutinesRepository from '@modules/training/infra/typeorm/repositories/RoutinesRepository';

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
