import {Module} from '@nestjs/common';
import {RechargeMockModule} from './recharge-mock/recharge-mock.module';
import {HealthModule} from "./health/health.module";

@Module({
  imports: [RechargeMockModule, HealthModule],
})
export class AppModule {}
