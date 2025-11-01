import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from "@nestjs/common";
import { Request, Response } from "express";
import { DomainException } from "@recharge/domain/exceptions/domain.exception";

/**
 * Global Exception Filter to handle and format all uncaught exceptions.
 * It ensures consistent HTTP responses for both domain and system errors.
 */
@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {

    private readonly logger = new Logger(GlobalExceptionFilter.name);

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Internal server error';
        let errorDetails: Record<string, any> = {};

        if (exception instanceof HttpException) {
            status = exception.getStatus();
            const exceptionResponse = exception.getResponse();

            if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
                message = (exceptionResponse as any).message || exception.message;
                errorDetails = exceptionResponse as Record<string, any>;
            } else {
                message = exception.message;
            }
        } else if (exception instanceof DomainException) {
            status = HttpStatus.BAD_REQUEST;
            message = exception.message;
        } else if (exception instanceof Error) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            message = 'An unexpected error occurred. Please try again later.';
            this.logger.error(`Unhandled error: ${exception.message}`, exception.stack);
        }

        this.logger.debug(`Error handled: ${message} (status=${status})`);

        response.status(status).json({
            timestamp: new Date().toISOString(),
            path: request.url,
            message,
            ...errorDetails,
        });
    }
}
