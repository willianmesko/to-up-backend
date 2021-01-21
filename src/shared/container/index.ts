import { container } from 'tsyringe';

import '@shared/infra/provider'

import IAccountsRepository from '@modules/accounts/repositories/IAccountsRepository';
import AccountRepository from '@modules/accounts/infra/typeorm/repositories/AccountsRepository'

container.registerSingleton<IAccountsRepository>(
    'AccountsRepository',
    AccountRepository,
);
