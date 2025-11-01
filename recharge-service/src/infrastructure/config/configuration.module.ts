import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { DatabaseConfig } from "./database.config";

/**
 * ConfigurationModule is responsible for setting up application-wide configurations.
 * It imports the ConfigModule to load environment variables and provides
 */
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),
    ],
    providers: [DatabaseConfig],
    exports: [DatabaseConfig],
})
export class ConfigurationModule {}
