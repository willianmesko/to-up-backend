import 'reflect-metadata';
import 'dotenv/config';
import express, { Request, Response, NextFunction, Express } from 'express';
import { createExpressServer } from 'routing-controllers';
import 'express-async-errors';
import { errors } from 'celebrate';
import AppError from '@shared/errors/AppError';
import rateLimiter from '../middlewares/rateLimiter';
import AccountsController from '@modules/accounts/infra/http/controllers/AccountController';


class HttpServer {
  public server: Express;

  constructor() {
    this.server = createExpressServer({
      cors: true,
      controllers: [
        AccountsController
      ],
    });

    this.middlewares();

    this.exceptionHandler();
  }

  middlewares(): void {
    this.server.use(rateLimiter);

    this.server.use(express.json());


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
      console.log(' Server started on port 8000!');
    });
  }
}

export default HttpServer;
