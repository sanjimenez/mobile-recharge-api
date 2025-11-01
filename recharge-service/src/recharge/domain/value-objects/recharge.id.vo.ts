/**
 * Value Object representing a recharge ID.
 */
export class RechargeIdVo {

    private readonly id: string;

    constructor(id: string) {
        this.id = id;
    }

    /**
     * Gets the string value of the RechargeIdVo.
     */
    get value(): string {
        return this.id;
    }

    /**
     * Converts the RechargeIdVo to a JSON representation.
     */
    toJSON() {
        return { value: this.id };
    }
}