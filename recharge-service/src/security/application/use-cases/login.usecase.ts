import { Inject, Injectable } from "@nestjs/common";
import { IAuthenticationUseCase } from "@security//domain/use-cases/authenticacion.use.case.interface";
import { SECURITY_USE_CASE } from "@security/shared/security.constants";
import { UserModel } from "@security/domain/model/user.model";

/**
 * Use case responsible for handling user login.
 */
@Injectable()
export class LoginUseCase {

    constructor(
        @Inject(SECURITY_USE_CASE)
        private readonly authenticationUseCase: IAuthenticationUseCase) {}

    /**
     * Execute the login process.
     *
     * @param user Input data for the user.
     */
    async execute(user: UserModel): Promise<string> {

        return await this.authenticationUseCase.login(user);
    }

}
