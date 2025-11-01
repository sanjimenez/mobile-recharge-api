import {IsNotEmpty, IsString} from "class-validator";

/**
 * Data Transfer Object representing a user.
 */
export class UserDto {

    @IsString({ message: 'Username should be a string' })
    @IsNotEmpty({ message: 'Username should not be empty' })
    username!: string;

    @IsString({ message: 'Password should be a string' })
    @IsNotEmpty({ message: 'Password should not be empty' })
    password!: string;
}
