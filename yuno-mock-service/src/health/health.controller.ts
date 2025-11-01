import {Controller, Get} from '@nestjs/common';

@Controller('health')
export class HealthController {
    @Get()
    getHealth() {
        return {
            service: 'YUNO-MOCK',
            status: 'UP',
            timestamp: new Date().toISOString(),
            version: '1.0.0',
        };
    }
}
