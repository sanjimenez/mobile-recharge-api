import { Recharge } from "@recharge/domain/models/recharge.model";
import { TransactionEntity } from "../entities/transaction.entity";
import { RechargeStatus } from "@recharge/domain/models/recharge.status";
import { AmountVO } from "@recharge/domain/value-objects/amount.vo";
import { PhoneNumberVo } from "@recharge/domain/value-objects/phone.number.vo";
import { UserIdVo } from "@recharge/domain/value-objects/user.id.vo";
import { RechargeIdVo } from "@recharge/domain/value-objects/recharge.id.vo";

/**
 * Mapper class to convert between Recharge domain model and TransactionEntity database entity.
 */
export class RechargeMapperDatabase {

    /**
     * Converts a TransactionEntity to a Recharge domain model.
     *
     * @param entity The TransactionEntity instance from the database.
     * @returns The corresponding Recharge domain model.
     */
    static toDomain(entity: TransactionEntity): Recharge {

        return new Recharge(
            new RechargeIdVo(entity.id),
            new UserIdVo(entity.userId),
            new PhoneNumberVo(entity.phoneNumber),
            new AmountVO(entity.amount),
            entity.status as RechargeStatus,
            entity.createdAt,
        );
    }

    /**
     * Converts a Recharge domain model to a TransactionEntity.
     *
     * @param domain The Recharge domain model instance.
     * @returns The corresponding TransactionEntity for database operations.
     */
    static toEntity(domain: Recharge): TransactionEntity {

        const entity = new TransactionEntity();
        entity.id = domain.id.value;
        entity.userId = domain.userId.value;
        entity.phoneNumber = domain.phoneNumber.value;
        entity.amount = domain.amount.value;
        entity.status = domain.status;
        entity.createdAt = domain.createdAt;
        entity.responseProvider = domain.networkResponse;
        return entity;
    }
}
