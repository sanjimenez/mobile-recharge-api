import { RechargeYunoResponseDto } from "@recharge/infrastructure/out/rest/dto/recharge.yuno.response.dto";

/**
 * Factory class to create mock RechargeYunoResponseDto objects for testing.
 */
export class RechargeYunoResponseMock {

  /**
   * Creates a mock RechargeYunoResponseDto instance with default or overridden values.
   */
  static createRechargeYunoResponseDto(): RechargeYunoResponseDto {

        return new RechargeYunoResponseDto('op-123','00','Recharge successful', 'YUNO');
    }
}
