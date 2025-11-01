import { Inject, Injectable, Logger } from "@nestjs/common";
import { IRechargeRepository } from "@recharge/domain/use-cases/recharge.repository.interface";
import { Recharge } from "@recharge/domain/models/recharge.model";
import { RECHARGE_PROVIDER, RECHARGE_REPOSITORY } from "@recharge/shared/recharge.constants";
import { IRechargeProvider } from "@recharge/domain/use-cases/recharge.provider.interface";
import { RechargeStatus } from "@recharge/domain/models/recharge.status";
import { RechargeCreationException } from "@recharge/domain/exceptions/recharge.creation.exception";

/**
 * Use case responsible for creating a new mobile recharge.
 */
@Injectable()
export class CreateRechargeUseCase {

    private readonly logger = new Logger(CreateRechargeUseCase.name);

    constructor(
        @Inject(RECHARGE_REPOSITORY)
        private readonly rechargeRepository: IRechargeRepository,
        @Inject(RECHARGE_PROVIDER)
        private readonly rechargeProvider: IRechargeProvider) {}

    /**
     * Executes the recharge creation process.
     *
     * @param recharge Input data for the recharge.
     * @returns The created Recharge domain object.
     * @throws Error If validation fails or persistence fails.
     */
    async execute(recharge: Recharge): Promise<Recharge> {

        try {
            await this.persistRecharge(recharge);

            const rechargeApi = await this.sendToProvider(recharge);

            await this.updateStatus(rechargeApi.id.value, rechargeApi.status, rechargeApi.networkResponse);

            return rechargeApi;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            this.logger.error(
              `Error creating recharge ${recharge.id.value}: ${errorMessage}`,
                error instanceof Error ? error.stack : undefined,);

            await this.updateStatus(recharge.id.value, RechargeStatus.FAILED, errorMessage);

            throw new RechargeCreationException(recharge.id.value);
        }
    }

    /**
     * Persists the recharge to the database.
     *
     * @param recharge The recharge to be persisted.
     */
    private async persistRecharge(recharge: Recharge) {

        this.logger.log(`Saving recharge for id=${recharge.id.value} to the database`);
        return this.rechargeRepository.save(recharge);
    }

    /**
     * Sends the recharge to the external provider.
     *
     * @param recharge The recharge to be sent.
     * @return The processed Recharge from the provider.
     */
    private async sendToProvider(recharge: Recharge): Promise<Recharge> {

        return this.rechargeProvider.send(recharge);
    }

    /**
     * Updates the status of an existing recharge.
     *
     * @param id The recharge ID.
     * @param status The new status.
     * @param networkResponse The network response from the provider.
     * @private
     */
    private async updateStatus(id: string, status: RechargeStatus, networkResponse: string) {

      return this.rechargeRepository.updateStatus(id, status, networkResponse);
    }


}
