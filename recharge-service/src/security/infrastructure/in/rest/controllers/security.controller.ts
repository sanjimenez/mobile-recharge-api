import { Body, Controller, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { UserDto } from "@security/infrastructure/in/rest/controllers/dtos/user.dto";
import { UserModel } from "@security/domain/model/user.model";
import { LoginUseCase } from "@security/application/use-cases/login.usecase";

/**
 * Controller responsible for handling authentication-related HTTP requests.
 */
@Controller('auth')
export class SecurityController {

    constructor(
        private readonly loginUseCase: LoginUseCase
    ) {}

    /**
     * Handles the login process for a user.
     *
     * @param dto Input data for the user.
     * @returns The jwt token for the logged-in user.
     */
    @Post("/login")
    @UsePipes(new ValidationPipe({ whitelist: true }))
    async login(@Body() dto: UserDto) {

        const jwt = await this.loginUseCase.execute(new UserModel(dto.username, dto.password));
        return {
            access_token: jwt
        };
    }

}
