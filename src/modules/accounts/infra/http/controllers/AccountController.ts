import { Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import {
    JsonController,
    Body,
    Res,
    Post,
    Get,
} from 'routing-controllers';
import ICreateAccountDTO from '@modules/accounts/dto/create-account.dto';
import CreateAccountService from '@modules/accounts/services/CreateAccountService'
@JsonController('/account')
export default class AccountsController {
    @Post('/')
    async create(
        @Body() body: ICreateAccountDTO,
        @Res() response: Response,
    ): Promise<Response> {
        try {
            const { name, email } = body;
            console.log(name, email)
            const createAccount = container.resolve(CreateAccountService);

            const account = await createAccount.execute({
                name,
                email
            });

            return response.json(classToClass(account));
        } catch (err) {
            return response.status(400).json({ error: err.message });
        }
    }
}
