import {Recharge} from '../models/recharge.model';

/**
 * Repository interface for managing Recharge entities.
 */
export interface IRechargeRepository {

    /**
     * Persists a new recharge in the data source.
     *
     * @param recharge The domain model representing the recharge.
     * @returns The saved recharge, including its generated ID.
     */
    save(recharge: Recharge): Promise<Recharge>;

    /**
     * Returns all recharges available in the data source by userId
     */
    findAllByUserId(userId: string): Promise<Recharge[]>;

    /**
     * Updates the status of a specific recharge.
     * @param id The recharge ID.
     * @param status The new status
     * @param responseProvider The response from the provider
     */
    updateStatus(id: string, status: string, responseProvider: string): Promise<void>;

}
