import { getMongoRepository, MongoRepository } from 'typeorm';
import IAccountsRepository from '@modules/accounts/repositories/IAccountsRepository';
import Account from '@modules/accounts/infra/typeorm/schemas/Account'
import ICreateAccountDTO from '@modules/accounts/dto/create-account.dto';

class AccountsRepository implements IAccountsRepository {
    private ormRepository: MongoRepository<Account>;

    constructor() {
        this.ormRepository = getMongoRepository(Account, 'mongo');
    }

    public async create(accountData: ICreateAccountDTO): Promise<Account> {
        const account = this.ormRepository.create(accountData);

        await this.ormRepository.save(account);

        return account;
    }

    public async findByEmail(email: string): Promise<Account | undefined> {
        const account = this.ormRepository.findOne({ where: { email } });

        return account;
    }
}


export default AccountsRepository;
