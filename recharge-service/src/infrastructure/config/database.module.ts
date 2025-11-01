import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DatabaseConfig } from "./database.config";
import { ConfigurationModule } from "./configuration.module";

/**
 * DatabaseModule sets up the database connection using TypeORM.
 */
@Module({
    imports: [
        ConfigurationModule,
        TypeOrmModule.forRootAsync({
            imports: [ConfigurationModule],
            inject: [DatabaseConfig],
            useFactory: (dbConfig: DatabaseConfig) => ({
                ...dbConfig.connectionOptions,
                autoLoadEntities: true,
                synchronize: true,
            }),
        }),
    ],
    exports: [TypeOrmModule],
})
export class DatabaseModule {}
