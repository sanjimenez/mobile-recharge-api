import { NestFactory } from "@nestjs/core";
import { Logger, ValidationPipe } from "@nestjs/common";
import { AppModule } from "./app.module";
import { GlobalExceptionFilter } from "@recharge/infrastructure/in/filters/http-exception.filter";

/**
 * Bootstrap function to initialize and start the NestJS application.
 * It sets up global validation pipes and starts listening on the specified port.
 */
async function bootstrap() {
    const logger = new Logger('Bootstrap');

    const app = await NestFactory.create(AppModule, {
        logger: ['log', 'error', 'warn', 'debug', 'verbose'],
    });

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: false,
            transform: true,
        }),
    );
    app.useGlobalFilters(new GlobalExceptionFilter());

    const port = parseInt(process.env.PORT || '3002', 10);
    await app.listen(port);
    logger.log(`🚀 Application is running on: http://localhost:${port}`);
}

bootstrap().catch((err) => {
    console.error('Fatal error during bootstrap:', err);
    process.exit(1);
});
