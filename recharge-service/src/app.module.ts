import { Module } from "@nestjs/common";
import { RechargeModule } from "@recharge/recharge.module";
import { SecurityModule } from "@security/security.module";
import { DatabaseModule } from "@infrastructure/config/database.module";
import { ConfigurationModule } from "@infrastructure/config/configuration.module";
import { HealthModule } from "@infrastructure/health/health.module";

/**
 * AppModule is the root module of the application.
 */
@Module({
    imports: [
        ConfigurationModule,
        DatabaseModule,
        RechargeModule,
        SecurityModule,
        HealthModule,
    ]
})
export class AppModule {}
