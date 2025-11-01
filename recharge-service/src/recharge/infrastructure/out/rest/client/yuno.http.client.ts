import { Injectable, Logger } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";
import { AxiosError } from "axios";
import { RechargeYunoResponseDto } from "@recharge/infrastructure/out/rest/dto/recharge.yuno.response.dto";
import { RechargeYunoRequestDto } from "@recharge/infrastructure/out/rest/dto/recharge.yuno.request.dto";
import { ExternalProviderException } from "@recharge/domain/exceptions/external-provider.exception";
import { ConfigService } from "@nestjs/config";

/**
 * YunoHttpClient is responsible for communicating with the Yuno operator API.
 */
@Injectable()
export class YunoHttpClient {

    private readonly logger = new Logger(YunoHttpClient.name);

    constructor(private readonly httpService: HttpService,
                private readonly configService: ConfigService) {}

    /**
     * Sends a recharge request to the external operator API.
     *
     * @param payload the recharge data to send
     * @returns the response from the operator API
     * @throws Error if the HTTP request fails
     */
    async postRecharge(payload: RechargeYunoRequestDto): Promise<RechargeYunoResponseDto> {

      const path = this.configService.get<string>('YUNO_API_URL');
      try {
          this.logger.debug(`[REQUEST_YUNO_API]: ${JSON.stringify(payload)}`);

          const response = await firstValueFrom(
              this.httpService.post( path + 'recharge', payload, {
                  headers: { 'Content-Type': 'application/json' },
                  timeout: 5000,
              }),
          );
          this.logger.debug(`[RESPONSE_YUNO_API]: ${JSON.stringify(response.data)}`);

          const { status, operatorTransactionId, message, operator } = response.data;

          return new RechargeYunoResponseDto(operatorTransactionId, status, message, operator);

      } catch (error) {
          const err = error as AxiosError;

          throw new ExternalProviderException(
              `Failed to send recharge to operator: ${err.response?.statusText || err.message}`,
              'YUNO'
          );
      }
  }
}
