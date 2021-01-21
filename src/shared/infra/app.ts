import 'reflect-metadata';
import 'dotenv/config';

import { inject, injectable } from 'tsyringe';
import 'express-async-errors';

import HttpServer from './http/server/express';

@injectable()
class App {
  constructor(
    @inject('HttpServer')
    private httpserver: HttpServer,
  ) {
    this.start();
  }

  async start(): Promise<void> {
    await this.httpserver.start();

  }
}

export default App;
