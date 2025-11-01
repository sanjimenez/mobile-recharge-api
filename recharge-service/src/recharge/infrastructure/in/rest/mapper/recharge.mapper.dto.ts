import { v4 as uuidv4 } from "uuid";
import { Recharge } from "@recharge/domain/models/recharge.model";
import { RechargeRequestDto } from "../dtos/recharge-request.dto";
import { RechargeStatus } from "@recharge/domain/models/recharge.status";
import { AmountVO } from "@recharge/domain/value-objects/amount.vo";
import { PhoneNumberVo } from "@recharge/domain/value-objects/phone.number.vo";
import { UserIdVo } from "@recharge/domain/value-objects/user.id.vo";
import { RechargeIdVo } from "@recharge/domain/value-objects/recharge.id.vo";
import { RechargeResponseDto } from "../dtos/recharge-response.dto";

/**
 * Mapper class to convert between Recharge dto and Recharge use case model.
 */
export class RechargeMapperDto {

    /**
     * Converts a TransactionEntity to a Recharge domain model.
     *
     * @param dto  The CreateRechargeDto instance from the HTTP request.
     * @param user The ID of the user performing the recharge.
     * @returns The corresponding Recharge domain model.
     */
    static toDomain(dto: RechargeRequestDto, user: string): Recharge {

        return new Recharge(
            new RechargeIdVo(uuidv4()),
            new UserIdVo(user),
            new PhoneNumberVo(dto.phoneNumber),
            new AmountVO(dto.amount),
            RechargeStatus.PENDING,
            new Date(),
        );
    }

    /**
     * Converts a Recharge domain model to a RechargeYunoResponseDto.
     *
     * @param domain The Recharge domain model instance.
     * @returns The corresponding RechargeYunoResponseDto for HTTP response.
     */
    static toResponseDto(domain: Recharge): RechargeResponseDto {

        return new RechargeResponseDto(
            domain.id.value,
            domain.userId.value,
            domain.phoneNumber.value,
            domain.amount.value,
            domain.status,
            domain.createdAt);

    }
}
