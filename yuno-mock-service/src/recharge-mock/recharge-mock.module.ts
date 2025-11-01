import {Module} from '@nestjs/common';
import {RechargeMockController} from './recharge-mock.controller';

@Module({
  controllers: [RechargeMockController]
})
export class RechargeMockModule {}
