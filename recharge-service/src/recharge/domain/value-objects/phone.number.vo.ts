import {PhoneException} from "@recharge/domain/exceptions/phone.exception";

/**
 * Value Object representing a phone number.
 */
export class PhoneNumberVo {

    private readonly phone: string;

    constructor(phone: string) {

        if (!/^3\d{9}$/.test(phone)) {
            throw new PhoneException('The phone number must start with 3, have 10 digits, and be numeric only.');
        }
        this.phone = phone;
    }

    /**
     * Gets the string value of the PhoneNumberVo.
     */
    get value(): string {
        return this.phone;
    }

    /**
     * Converts the PhoneNumberVo to a JSON representation.
     */
    toJSON() {
        return { value: this.phone };
    }
}