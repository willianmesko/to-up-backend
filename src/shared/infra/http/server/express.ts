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
import UserAvatarController from '@modules/users/infra/http/controllers/UserAvatarController';
import AthletetesController from '@modules/athletes/infra/http/controllers/AthletesController';
import AthleteAvatarController from '@modules/athletes/infra/http/controllers/AthleteAvatarController';
import AthleteWorkoutController from '@modules/athletes/infra/http/controllers/AthleteWorkoutController';
import AthleteSignUpController from '@modules/athletes/infra/http/controllers/AthleteSignUpController';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';

import trainingRouter from '@modules/training/infra/http/routes/training.routes';
import routinesRouter from '@modules/training/infra/http/routes/routines.routes';
import exercicesRouter from '@modules/training/infra/http/routes/exercices.routes';
import routineExerciceRouter from '@modules/training/infra/http/routes/routine_exercice.routes';

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

        AthletetesController,
        AthleteAvatarController,
        AthleteWorkoutController,
        AthleteSignUpController,
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
    await this.server.listen(8000, () => {
      console.log('🚀️ Server started on port 8000!');
    });
  }
}

export default HttpServer;
