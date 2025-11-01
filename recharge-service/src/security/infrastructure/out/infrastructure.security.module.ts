import { Module } from "@nestjs/common";
import { SECURITY_USE_CASE } from "@security/shared/security.constants";
import { AuthenticationUseCaseImpl } from "@security/infrastructure/out/token-provider/authentication.use.case.impl";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "@security/infrastructure/in/rest/security/jwt.strategy";
import { ConfigurationModule } from "@infrastructure/config/configuration.module";
import { ConfigService } from "@nestjs/config";

/**
 * InfrastructureSecurityModule sets up security-related infrastructure components,
 * including JWT authentication and the authentication use case implementation.
 */
@Module({
    imports: [
        ConfigurationModule,
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync({
            imports: [ConfigurationModule],
            inject:[ConfigService],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET', 'default_secret'),
                signOptions: { expiresIn: '30m' },
            }),
        }),
    ],
    providers: [
        JwtStrategy,
        {
            provide: SECURITY_USE_CASE,
            useClass: AuthenticationUseCaseImpl,
        },
    ],
    exports: [
        SECURITY_USE_CASE,
        JwtModule,
        PassportModule,
    ],
})
export class InfrastructureSecurityModule {}
