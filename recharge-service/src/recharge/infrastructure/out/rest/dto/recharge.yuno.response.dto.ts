/**
 * Data Transfer Object representing the response from a Yuno recharge operation.
 */
export class RechargeYunoResponseDto {

    /**
     * Creates a new Recharge instance.
     *
     * @param operatorTransactionId Unique identifier for the recharge.
     * @param status Current status of the operation.
     * @param message Message associated with the recharge status.
     * @param operator Identifier of the operator performing the recharge.
     */
    constructor(
        public readonly operatorTransactionId: string,
        public readonly status: string,
        public readonly message: string,
        public readonly operator: string,
    ) {}
}
