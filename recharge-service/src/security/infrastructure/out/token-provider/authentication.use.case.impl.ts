import { Injectable, Logger } from "@nestjs/common";
import { IAuthenticationUseCase } from "@security/domain/use-cases/authenticacion.use.case.interface";
import { UserModel } from "@security/domain/model/user.model";
import { JwtService } from "@nestjs/jwt";
import { BusinessException } from "../../../../shared/exceptions/business.exception";
import { ConfigService } from "@nestjs/config";

/**
 * Authentication use case implementation responsible for handling user login and token generation.
 */
@Injectable()
export class AuthenticationUseCaseImpl implements IAuthenticationUseCase {

    private readonly logger = new Logger(AuthenticationUseCaseImpl.name);

    constructor(private readonly jwtService: JwtService,
                private readonly configService: ConfigService) {}

    /**
     * @inheritDoc
     */
    async login(user: UserModel): Promise<string> {

        const isValid = await this.validateUser(user);
        if (!isValid) {
            throw new BusinessException('Invalid credentials');
        }

        this.logger.log(`User ${user.user} logged in successfully.`);
        const payload = { sub: user.user};
        return this.jwtService.sign(payload);
    }

    /**
     * Validates the user's credentials.
     *
     * @param user The user model containing login credentials.
     */
    private async validateUser(user: UserModel): Promise<boolean> {

        const envUser = this.configService.get<string>('AUTH_USER');
        const envPassword = this.configService.get<string>('AUTH_PASSWORD');
        return user.user === envUser && user.password === envPassword;
    }
}
