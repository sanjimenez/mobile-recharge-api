import { RechargeStatus } from "./recharge.status";
import { AmountVO } from "../value-objects/amount.vo";
import { PhoneNumberVo } from "../value-objects/phone.number.vo";
import { UserIdVo } from "../value-objects/user.id.vo";
import { RechargeIdVo } from "../value-objects/recharge.id.vo";

/**
 * Represents a mobile phone recharge transaction.
 */
export class Recharge {

    /**
     * Creates a new Recharge instance.
     *
     * @param id Unique identifier for the recharge.
     * @param userId Identifier of the user performing the recharge.
     * @param phoneNumber Phone number to be recharged.
     * @param amount Amount to be recharged.
     * @param status Current status of the recharge
     * @param createdAt Date when the recharge was created.
     * @param networkResponse Optional response from the network provider.
     */
    constructor(
        public readonly id: RechargeIdVo,
        public readonly userId: UserIdVo,
        public readonly phoneNumber: PhoneNumberVo,
        public readonly amount: AmountVO,
        public readonly status: RechargeStatus,
        public readonly createdAt: Date,
        public readonly networkResponse?: any,
    ) {}

}
