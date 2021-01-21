import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Account from '@modules/accounts/infra/typeorm/schemas/Account';
import IAccountsRepository from '../repositories/IAccountsRepository';

interface IRequest {
    name: string;
    email: string;
}

@injectable()
class CreateAccountService {
    constructor(
        @inject('AccountsRepository')
        private accountsRepository: IAccountsRepository,

    ) { }

    public async execute({
        name,
        email,
    }: IRequest): Promise<Account> {
        const checkUserExists = await this.accountsRepository.findByEmail(email);

        if (checkUserExists) {
            throw new AppError('Email address already used.');
        }


        const account = await this.accountsRepository.create({
            name,
            email,
        });




        return account;
    }
}

export default CreateAccountService;
