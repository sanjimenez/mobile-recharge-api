/**
 * Domain Exception
 */
import { HttpStatus } from '@nestjs/common';

/**
 * Base class for all domain-level exceptions.
 * Provides a standard structure for message, status code, and context.
 */
export class DomainException extends Error {
    public readonly statusCode: number;
    public readonly context?: string;

    constructor(message: string, statusCode: number = HttpStatus.BAD_REQUEST, context?: string) {
        super(message);
        this.statusCode = statusCode;
        this.context = context;

        Object.setPrototypeOf(this, new.target.prototype);
    }
}
