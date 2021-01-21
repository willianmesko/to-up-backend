import ICreateAccountDTO from '../dto/create-account.dto';
import Account from '../infra/typeorm/schemas/Account'

export default interface IAccountsRepository {
    create(data: ICreateAccountDTO): Promise<Account>
    findByEmail(email: string): Promise<Account | undefined>
}