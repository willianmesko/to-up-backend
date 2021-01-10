import 'reflect-metadata';
import 'dotenv/config';

import { inject, injectable } from 'tsyringe';
import 'express-async-errors';
import IAmqpProvider from '@shared/container/providers/AmqpProvider/models/IAmqpProvider';
import HttpServer from './http/server/express';

@injectable()
class App {
  constructor(
    @inject('HttpServer')
    private httpserver: HttpServer, // @inject('AmqpProvider')
  ) // private amqpProvider: IAmqpProvider,
  {
    this.start();
  }

  async start(): Promise<void> {
    await this.httpserver.start();
    // await this.amqpProvider.start();
  }
}

export default App;
