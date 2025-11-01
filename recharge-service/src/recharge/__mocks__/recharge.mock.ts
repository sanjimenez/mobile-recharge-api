import { Recharge } from "@recharge/domain/models/recharge.model";
import { AmountVO } from "@recharge/domain/value-objects/amount.vo";
import { PhoneNumberVo } from "@recharge/domain/value-objects/phone.number.vo";
import { RechargeIdVo } from "../domain/value-objects/recharge.id.vo";
import { UserIdVo } from "../domain/value-objects/user.id.vo";
import { RechargeStatus } from "../domain/models/recharge.status";

/**
 * Factory class to create mock Recharge objects for testing.
 */
export class RechargeMockFactory {

  /**
   * Creates a mock Recharge instance with default or overridden values.
   */
  static createRecharge(): Recharge {

    return this.createRechargeID('1');
  }

    /**
     * Creates a mock Recharge instance with default or overridden values.
     */
    static createRechargeID(id: string): Recharge {

        return new Recharge(
            new RechargeIdVo(id),
            new UserIdVo('user-1'),
            new PhoneNumberVo('3001234567'),
            new AmountVO(5000),
            RechargeStatus.PENDING,
            new Date(),
        );
    }
}
