import { RechargeYunoRequestDto } from "@recharge/infrastructure/out/rest/dto/recharge.yuno.request.dto";

/**
 * Factory class to create mock RechargeYunoRequestDto objects for testing.
 */
export class RechargeYunoRequestMock {

  /**
   * Creates a mock RechargeYunoRequestDto instance with default or overridden values.
   */
  static createRechargeYunoRequestDto(): RechargeYunoRequestDto {

        return new RechargeYunoRequestDto('op-123','SUCCESS',5000 ,'3001234567');
    }
}
