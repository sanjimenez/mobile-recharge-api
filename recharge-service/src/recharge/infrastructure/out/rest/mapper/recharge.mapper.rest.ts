import { Recharge } from "@recharge/domain/models/recharge.model";
import { RechargeYunoRequestDto } from "@recharge/infrastructure/out/rest/dto/recharge.yuno.request.dto";
import { RechargeStatus } from "@recharge/domain/models/recharge.status";
import { RechargeYunoResponseDto } from "@recharge/infrastructure/out/rest/dto/recharge.yuno.response.dto";

/**
 * Mapper class to convert between Recharge domain model and external REST DTOs.
 */
export class RechargeMapperRest {

    /**
     * Converts a Recharge domain model to a RechargeYunoRequestDto.
     *
     * @param model The Recharge domain model instance.
     * @returns The corresponding RechargeYunoRequestDto for external REST requests.
     */
    static toRequestDto(model: Recharge): RechargeYunoRequestDto {

        return new RechargeYunoRequestDto(
            model.id.value,
            model.userId.value,
            model.amount.value,
            model.phoneNumber.value,
        );
    }

    /**
     * Converts a RechargeYunoResponseDto to a Recharge domain model.
     *
     * @param response The RechargeYunoResponseDto instance from the external REST response.
     * @param model    The original Recharge domain model instance.
     * @param status   The updated status of the recharge.
     * @returns The corresponding Recharge domain model with updated status and network response.
     */
    static toModel(response: RechargeYunoResponseDto, model: Recharge, status: RechargeStatus): Recharge {

        return new Recharge(
            model.id,
            model.userId,
            model.phoneNumber,
            model.amount,
            status,
            model.createdAt,
            JSON.stringify(response),
        );
    }
}
