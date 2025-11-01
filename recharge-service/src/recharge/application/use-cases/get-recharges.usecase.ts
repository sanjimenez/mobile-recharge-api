import { Inject, Injectable, Logger } from "@nestjs/common";
import { IRechargeRepository } from "@recharge/domain/use-cases/recharge.repository.interface";

import { Recharge } from "@recharge/domain/models/recharge.model";
import { RECHARGE_REPOSITORY } from "@recharge/shared/recharge.constants";

/**
 * Use case responsible for retrieving recharges for a user.
 */
@Injectable()
export class GetRechargesUseCase {

    private readonly logger = new Logger(GetRechargesUseCase.name);

    constructor(
        @Inject(RECHARGE_REPOSITORY)
        private readonly rechargeRepository: IRechargeRepository) {}

    /**
     * Executes the recharge creation process.
     *
     * @param userId The ID of the user whose recharges are to be retrieved.
     */
    async execute(userId: string): Promise<Recharge[]> {

          this.logger.debug(`Fetching recharges for user: ${userId}`);

          return await this.rechargeRepository.findAllByUserId(userId);
    }

}
