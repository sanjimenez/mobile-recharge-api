import { HttpStatus } from '@nestjs/common';
import { DomainException } from './domain.exception';

/**
 * Exception thrown when a recharge amount is out of the allowed range.
 */
export class RechargeOutOfRangeException extends DomainException {

    constructor(message: string = 'Recharge amount is out of the allowed range.') {
        super(
            message,
            HttpStatus.BAD_REQUEST,
            'RechargeValidation',
        );
    }
}
