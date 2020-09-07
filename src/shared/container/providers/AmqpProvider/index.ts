import { container } from 'tsyringe';

import IAmqpProvider from '@shared/container/providers/AmqpProvider/models/IAmqpProvider';

import RabbitMQProvider from '@shared/container/providers/AmqpProvider/implementations/RabbitMQProvider';

container.registerSingleton<IAmqpProvider>('AmqpProvider', RabbitMQProvider);
