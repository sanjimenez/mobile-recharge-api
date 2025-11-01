/**
 * Represents a user in the system.
 */
export class UserModel {

    /**
     * Login model constructor.
     *
     * @param user  The user string.
     * @param password The password string.
     */
    constructor(
        public readonly user: string,
        public readonly password: string,
    ) {}

}
