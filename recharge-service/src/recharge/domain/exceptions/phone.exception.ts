import {DomainException} from './domain.exception';

/**
 * Exception thrown for phone-related domain errors.
 */
export class PhoneException extends DomainException {

    constructor(message: string) {
        super(message);
    }
}

