import {Recharge} from '../models/recharge.model';

/**
 * Provider interface for sending recharge requests to external services.
 */
export interface IRechargeProvider {

    /**
     * Sends a recharge request to an external provider.
     *
      * @param recharge The recharge details to be sent.
      * @returns The processed Recharge object from the provider.
     */
    send(recharge: Recharge): Promise<Recharge>;

}
