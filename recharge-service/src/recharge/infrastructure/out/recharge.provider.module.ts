import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TransactionEntity } from "./database/entities/transaction.entity";
import { RechargeRepositoryImpl } from "./provider/recharge.repository.impl";
import { RECHARGE_PROVIDER, RECHARGE_REPOSITORY } from "@recharge/shared/recharge.constants";
import { RechargeProviderImpl } from "@recharge/infrastructure/out/provider/recharge.provider.impl";
import { OperatorHttpModule } from "@recharge/infrastructure/out/rest/operator-http.module";

/**
 * RechargeProviderModule sets up the infrastructure for recharge operations,
 */
@Module({
    imports: [
        TypeOrmModule.forFeature([TransactionEntity]),
        OperatorHttpModule],
    providers: [
        {
            provide: RECHARGE_REPOSITORY,
            useClass: RechargeRepositoryImpl,
        },
        {
            provide: RECHARGE_PROVIDER,
            useClass: RechargeProviderImpl,
        },
    ],
    exports: [RECHARGE_REPOSITORY, RECHARGE_PROVIDER],
})
export class RechargeProviderModule {}