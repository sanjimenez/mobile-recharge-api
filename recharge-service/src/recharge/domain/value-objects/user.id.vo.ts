/**
 * Value Object representing a user ID.
 */
export class UserIdVo {

    private readonly id: string;

    constructor(id: string) {
        this.id = id;
    }

    /**
     * Gets the string value of the UserIdVo.
     */
    get value(): string {
        return this.id;
    }

    /**
     * Converts the UserIdVo to a JSON representation.
     */
    toJSON() {
        return { value: this.id };
    }
}