import {
  Body,
  Controller,
  Logger,
  Post,
  InternalServerErrorException,
  HttpCode,
} from '@nestjs/common';

class RechargeMockRequestDto {
  transactionId: string;
  user: string;
  amount: number;
  phone: string;
}

@Controller('recharge')
export class RechargeMockController {
  private readonly logger = new Logger(RechargeMockController.name);

  @Post()
  @HttpCode(200)
  simulateRecharge(@Body() payload: RechargeMockRequestDto) {
    this.logger.debug(`Received mock recharge request: ${JSON.stringify(payload)}`);

    const phoneStr = String(payload.phone);

    if (!phoneStr || !/^\d+$/.test(phoneStr)) {
      return {
        status: 'FAILED',
        operatorTransactionId: `mock-${Date.now()}`,
        message: 'Invalid phone number format',
        operator: 'YUNO-MOCK',
      };
    }

    const lastDigit = parseInt(phoneStr[phoneStr.length - 1], 10);

    if (lastDigit >= 0 && lastDigit <= 5) {
      this.logger.log(`Mock response for tx=${payload.transactionId}: SUCCESS (lastDigit=${lastDigit})`);
      return {
        status: '00',
        operatorTransactionId: `mock-${payload.transactionId}`,
        message: 'Recharge approved successfully',
        operator: 'YUNO-MOCK',
      };
    } else if (lastDigit === 6 || lastDigit === 7) {
      this.logger.log(`Mock response for tx=${payload.transactionId}: DECLINED (lastDigit=${lastDigit})`);
      return {
        status: 'C1',
        operatorTransactionId: `mock-${payload.transactionId}`,
        message: 'The number does not belong to the operator (last digit 6-7)',
        operator: 'YUNO-MOCK',
      };
    } else if (lastDigit === 8 || lastDigit === 9) {
      this.logger.error(`Mock response for tx=${payload.transactionId}: FAILED (lastDigit=${lastDigit})`);
      throw new InternalServerErrorException({
        status: 'C2',
        operatorTransactionId: `mock-${payload.transactionId}`,
        message: 'Recharge failed by operator policy (last digit 8-9)',
        operator: 'YUNO-MOCK',
      });
    }
  }
}
