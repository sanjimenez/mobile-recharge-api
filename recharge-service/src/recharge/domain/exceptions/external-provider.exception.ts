/**
 * Exception thrown when there is an error with an external provider.
 */
import { HttpStatus } from '@nestjs/common';
import { DomainException } from './domain.exception';

/**
 * Exception thrown when an external provider fails (e.g., Yuno API).
 */
export class ExternalProviderException extends DomainException {

    constructor(message: string, provider?: string) {
        super(
            message,
            HttpStatus.BAD_GATEWAY,
            provider,
        );
    }
}
