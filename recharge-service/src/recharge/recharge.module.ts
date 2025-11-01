import { Module } from "@nestjs/common";
import { RechargeController } from "@recharge/infrastructure/in/rest/controllers/recharge.controller";
import { SecurityModule } from "@security/security.module";
import { CreateRechargeUseCase } from "@recharge/application/use-cases/create-recharge.usecase";
import { GetRechargesUseCase } from "@recharge/application/use-cases/get-recharges.usecase";
import { RechargeProviderModule } from "@recharge/infrastructure/out/recharge.provider.module";
import { ConfigurationModule } from "@infrastructure/config/configuration.module";

/**
 * RechargeModule bundles all recharge-related components,
 */
@Module({
    imports: [
        ConfigurationModule,
        SecurityModule,
        RechargeProviderModule,
    ],
    controllers: [RechargeController],
    providers: [
        CreateRechargeUseCase,
        GetRechargesUseCase,
    ]
})
export class RechargeModule {}
