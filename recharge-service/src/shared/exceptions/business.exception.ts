import { HttpException, HttpStatus } from "@nestjs/common";

/**
 * BusinessException is a custom exception class for handling business logic errors.
 * It extends the HttpException class from NestJS and allows specifying a custom
 * HTTP status code, defaulting to BAD_REQUEST (400).
 */
export class BusinessException extends HttpException {

    constructor(message: string, status: HttpStatus = HttpStatus.BAD_REQUEST) {
        super(message, status);
    }
}