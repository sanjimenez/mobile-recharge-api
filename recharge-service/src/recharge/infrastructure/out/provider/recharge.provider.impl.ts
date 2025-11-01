import { Injectable, Logger } from "@nestjs/common";
import { Recharge } from "@recharge/domain/models/recharge.model";
import { IRechargeProvider } from "@recharge/domain/use-cases/recharge.provider.interface";
import { YunoHttpClient } from "@recharge/infrastructure/out/rest/client/yuno.http.client";
import { RechargeMapperRest } from "@recharge/infrastructure/out/rest/mapper/recharge.mapper.rest";
import { StatusCodeMapper } from "@recharge/infrastructure/out/rest/mapper/status.code.mapper";

/**
 * Implementation of the IRechargeProvider interface to send recharge requests to an external operator.
 */
@Injectable()
export class RechargeProviderImpl implements IRechargeProvider {

    private readonly logger = new Logger(RechargeProviderImpl.name);

    constructor(private readonly operatorHttpClient: YunoHttpClient) {}

    /**
     * @inheritDoc
     */
    async send(recharge: Recharge): Promise<Recharge> {

      this.logger.log(`Preparing to send recharge with id:${recharge.id.value}`);
        
      const response = await this.operatorHttpClient.postRecharge(RechargeMapperRest.toRequestDto(recharge));

      this.logger.log(`Recharge sent successfully to operator for id:${recharge.id.value}`);

      // Map external status to internal status
      const internalStatus = StatusCodeMapper.toInternalStatus(response.status);

      return RechargeMapperRest.toModel(response, recharge, internalStatus);
    }
}
