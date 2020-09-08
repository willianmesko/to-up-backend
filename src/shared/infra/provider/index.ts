import { container } from 'tsyringe';

import HttpServer from '../http/server/express';

container.registerSingleton('HttpServer', HttpServer);
