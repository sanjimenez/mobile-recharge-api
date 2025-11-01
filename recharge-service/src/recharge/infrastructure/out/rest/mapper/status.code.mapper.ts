import { RechargeStatus } from "@recharge/domain/models/recharge.status";

/**
 * Mapper to convert external provider status codes to internal status codes.
 */
export class StatusCodeMapper {
    
    /**
     * Maps from external provider codes (Yuno) to internal RechargeStatus.
     */
    private static readonly EXTERNAL_TO_INTERNAL_MAP = new Map<string, RechargeStatus>([
        ['00', RechargeStatus.SUCCESS],
        ['SUCCESS', RechargeStatus.SUCCESS],
        ['PENDING', RechargeStatus.PENDING],
        ['C1', RechargeStatus.DECLINED],
        ['DECLINED', RechargeStatus.DECLINED],
        ['C2', RechargeStatus.FAILED],
        ['FAILED', RechargeStatus.FAILED],
    ]);

    /**
     * Converts external provider status code to internal RechargeStatus.
     * 
     * @param externalCode The status code from the external provider
     * @returns The corresponding internal RechargeStatus
     */
    static toInternalStatus(externalCode: string): RechargeStatus {
        const internalStatus = this.EXTERNAL_TO_INTERNAL_MAP.get(externalCode);
        
        if (!internalStatus) {
            return RechargeStatus.FAILED;
        }
        
        return internalStatus;
    }
}