import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { YunoHttpClient } from "@recharge/infrastructure/out/rest/client/yuno.http.client";

/**
 * OperatorHttpModule configures the HTTP client for operator communication.
 */
@Module({
    imports: [
        HttpModule.register({
            timeout: 5000,
            maxRedirects: 5,
        }),
    ],
    providers: [YunoHttpClient],
    exports: [YunoHttpClient],
})
export class OperatorHttpModule {}
