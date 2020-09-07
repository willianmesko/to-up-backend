import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response, NextFunction, Express } from 'express';
import { inject, injectable } from 'tsyringe';
import 'express-async-errors';

import cors from 'cors';
import { errors } from 'celebrate';
import uploadConfig from '@config/upload';

import AppError from '@shared/errors/AppError';
import IAmqpProvider from '@shared/container/providers/AmqpProvider/models/IAmqpProvider';
import rateLimiter from './middlewares/rateLimiter';

import routes from './routes';

@injectable()
class App {
  public server: Express;

  constructor(
    @inject('AmqpProvider')
    private amqpProvider: IAmqpProvider,
  ) {
    this.server = express();

    this.middlewares();
    this.routes();
    this.exceptionHandler();
    this.start();
  }

  middlewares(): void {
    this.server.use(rateLimiter);
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use('/files', express.static(uploadConfig.uploadsFolder));
    this.server.use(routes);

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

  routes(): void {
    this.server.use(routes);
  }

  async start(): Promise<void> {
    await this.server.listen(8000, () => {
      console.log('🚀️ Server started on port 8000!');
    });

    await this.amqpProvider.start();
  }
}

export default App;
