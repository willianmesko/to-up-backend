import "reflect-metadata";
import '@shared/infra/typeorm';
import '@shared/container';
import { container } from 'tsyringe';
import App from '@shared/infra/app';

container.resolve(App);
