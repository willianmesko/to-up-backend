import '@shared/infra/typeorm';
import '@shared/container';
import { container } from 'tsyringe';

import App from './http/app';

container.resolve(App);
