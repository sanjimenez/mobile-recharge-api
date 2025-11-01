/**
 * Data Transfer Object for Recharge Yuno Request.
 */
export class RechargeYunoRequestDto {

    /**
     * Creates a new Recharge instance.
     *
     * @param transactionId Unique identifier for the recharge.
     * @param user Identifier of the user performing the recharge.
     * @param amount Amount to be recharged.
     * @param phone Phone number to be recharged.
     */
    constructor(
        public readonly transactionId: string,
        public readonly user: string,
        public readonly amount: number,
        public readonly phone: string,
    ) {}
}
