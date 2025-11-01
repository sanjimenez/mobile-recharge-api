import { UserModel } from "@security/domain/model/user.model";

/**
 * Interface for the Authentication use case.
 */
export interface IAuthenticationUseCase {

    /**
     * Logs in a user.
     *
     * @param user The user model containing login credentials.
     *
     * @returns A promise that resolves to a JWT token string upon successful login.
     */
    login(user: UserModel): Promise<string>;

}
