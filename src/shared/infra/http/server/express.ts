import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response, NextFunction, Express } from 'express';
import { createExpressServer } from 'routing-controllers';
import 'express-async-errors';

import { errors } from 'celebrate';
import uploadConfig from '@config/upload';

import AppError from '@shared/errors/AppError';

import SessionsController from '@modules/users/infra/http/controllers/SessionsController';
import UsersController from '@modules/users/infra/http/controllers/UsersController';
import UserAdressController from '@modules/users/infra/http/controllers/UserAdressController';
import UserAvatarController from '@modules/users/infra/http/controllers/UserAvatarController';
import AthletetesController from '@modules/athletes/infra/http/controllers/AthletesController';
import AthleteAvatarController from '@modules/athletes/infra/http/controllers/AthleteAvatarController';
import AthleteWorkoutController from '@modules/athletes/infra/http/controllers/AthleteWorkoutController';
import AthleteSignUpController from '@modules/athletes/infra/http/controllers/AthleteSignUpController';

import ProfileController from '@modules/users/infra/http/controllers/ProfileController';
import ForgotPasswordController from '@modules/users/infra/http/controllers/ForgotPasswordController';
import ResetPasswordController from '@modules/users/infra/http/controllers/ResetPasswordController';

import EvaluationController from '@modules/athletes/infra/http/controllers/EvaluationController';
import ExercicesController from '@modules/training/infra/http/controllers/ExercicesController';
import TrainingController from '@modules/training/infra/http/controllers/TrainingController';
import TrainingAthletesController from '@modules/training/infra/http/controllers/TrainingAthletesController';
import TrainingDuplicateController from '@modules/training/infra/http/controllers/TrainingDuplicateController';

import RoutinesController from '@modules/training/infra/http/controllers/RoutinesController';
import RoutineExerciceController from '@modules/training/infra/http/controllers/RoutineExerciceController';
import rateLimiter from '../middlewares/rateLimiter';

class HttpServer {
  public server: Express;

  constructor() {
    this.server = createExpressServer({
      cors: true,
      controllers: [
        SessionsController,
        UsersController,
        UserAvatarController,
        ProfileController,
        AthletetesController,
        AthleteAvatarController,
        AthleteWorkoutController,
        AthleteSignUpController,
        ExercicesController,
        ForgotPasswordController,
        ResetPasswordController,
        TrainingController,
        EvaluationController,
        TrainingAthletesController,
        TrainingDuplicateController,
        RoutinesController,
        RoutineExerciceController,
        UserAdressController,
      ], // we specify controllers we want to use
    });

    this.middlewares();

    this.exceptionHandler();
  }

  middlewares(): void {
    this.server.use(rateLimiter);

    this.server.use(express.json());
    this.server.use('/files', express.static(uploadConfig.uploadsFolder));

    this.server.use(errors());
  }

  exceptionHandler(): Response | void {
    this.server.use(
      (err: Error, request: Request, response: Response, _: NextFunction) => {
        if (err instanceof AppError) {
          return response.status(err.statusCode).json({
            status: 'error',
            message: err.message,
          });
        }

        console.error(err);

        return response.status(500).json({
          status: 'error',
          message: 'Internal server error.',
        });
      },
    );
  }

  async start(): Promise<void> {
    await this.server.listen(8001, () => {
      console.log('🚀️ Server started on port 8001!');
    });
  }
}

export default HttpServer;
