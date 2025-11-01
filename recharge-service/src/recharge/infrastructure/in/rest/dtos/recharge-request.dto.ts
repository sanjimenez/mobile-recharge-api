import { IsNotEmpty, IsNumber } from "class-validator";

/**
 * Data Transfer Object for creating a new recharge.
 *
 * This class is used to validate and type-check the incoming
 * request payload before passing it to the use case layer.
 */
export class RechargeRequestDto {

    @IsNotEmpty({ message: 'Phone number must not be empty' })
    phoneNumber!: string;

    @IsNumber({}, { message: 'Amount must be a valid number' })
    amount!: number;
}
