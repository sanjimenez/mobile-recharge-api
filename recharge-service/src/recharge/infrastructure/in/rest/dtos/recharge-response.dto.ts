/**
 * Data Transfer Object for Recharge Response.
 *
 * This class is used to structure the data sent back to the client
 * after a recharge operation is performed.
 */
export class RechargeResponseDto {

    constructor(
        public readonly id: string,
        public readonly userName: string,
        public readonly phoneNumber: string,
        public readonly amount: number,
        public readonly status: string,
        public readonly createdAt: Date,
    ) {}
}
