import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

/**
 * DatabaseConfig provides database connection options based on environment variables.
 * It supports both PostgresSQL and SQLite databases.
 */
@Injectable()
export class DatabaseConfig {
    constructor(private readonly configService: ConfigService) {}

    get type(): 'postgres' | 'sqlite' {
        return (this.configService.get<string>('DB_TYPE') as 'postgres' | 'sqlite') || 'sqlite';
    }

    get connectionOptions() {

        console.log(`Database type: ${this.type}`);
        if (this.type === 'sqlite') {
            return {
                type: 'sqlite' as const,
                database: './data/database.sqlite',
            };
        }

        return {
            type: 'postgres' as const,
            host: this.configService.get<string>('DB_HOST'),
            port: parseInt(this.configService.get<string>('DB_PORT')||'', 10),
            username: this.configService.get<string>('DB_USERNAME'),
            password: this.configService.get<string>('DB_PASSWORD'),
            database: this.configService.get<string>('DB_NAME'),
        };
    }
}
``
