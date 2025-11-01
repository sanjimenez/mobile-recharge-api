import { RechargeOutOfRangeException } from "../exceptions/recharge.out.of.range.exception";

/**
 * Value Object representing a monetary amount for a recharge.
 */
export class AmountVO {

    private readonly amount: number;

    constructor(amount: number) {
        if (amount <= 1000 || amount > 100000) {
            throw new RechargeOutOfRangeException('Recharge amount is out of allowed range');
        }
        this.amount = amount;
    }

    /**
     * Gets the numeric value of the AmountVO.
     */
    get value(): number {
        return this.amount;
    }

    /**
     * Converts the AmountVO to a JSON representation.
     */
    toJSON() {
        return { value: this.amount };
    }
}