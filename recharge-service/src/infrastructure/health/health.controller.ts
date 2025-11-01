import { Controller, Get } from "@nestjs/common";
import { HealthCheck, HealthCheckService, HttpHealthIndicator, TypeOrmHealthIndicator } from "@nestjs/terminus";
import { ConfigService } from "@nestjs/config";

@Controller('health')
export class HealthController {
    constructor(
        private health: HealthCheckService,
        private db: TypeOrmHealthIndicator,
        private http: HttpHealthIndicator,
        private configService: ConfigService,
    ) {}

    @Get()
    @HealthCheck()
    check() {

        const url= this.configService.get<string>('YUNO_API_URL')+'health';
        return this.health.check([
            async () => this.db.pingCheck('database', { timeout: 300 }),
            async () => this.http.pingCheck('yuno-mock', url),
        ]);
    }
}
