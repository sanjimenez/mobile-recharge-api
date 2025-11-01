import { Module } from "@nestjs/common";
import { SecurityController } from "@security/infrastructure/in/rest/controllers/security.controller";
import { InfrastructureSecurityModule } from "@security/infrastructure/out/infrastructure.security.module";
import { LoginUseCase } from "@security/application/use-cases/login.usecase";

/**
 * SecurityModule bundles security-related controllers and use cases.
 * It imports the InfrastructureSecurityModule to access security implementations
 * and provides the LoginUseCase for handling user login.
 */
@Module({
    imports: [
        InfrastructureSecurityModule],
    controllers: [SecurityController],
    providers: [LoginUseCase],
    exports: [InfrastructureSecurityModule],
})
export class SecurityModule {}
