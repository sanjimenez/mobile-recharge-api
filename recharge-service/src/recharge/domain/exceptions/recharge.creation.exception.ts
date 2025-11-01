import { HttpStatus } from '@nestjs/common';
import { DomainException } from './domain.exception';

/**
 * Exception thrown when the recharge creation process fails.
 */
export class RechargeCreationException extends DomainException {

    constructor(public readonly rechargeId: string) {
        super(
            `Failed to create recharge with id: ${rechargeId}`,
            HttpStatus.BAD_REQUEST,
            'RechargeCreation',
        );
    }
}
