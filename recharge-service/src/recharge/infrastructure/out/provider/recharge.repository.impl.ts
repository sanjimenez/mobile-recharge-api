import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Recharge } from "@recharge/domain/models/recharge.model";
import { RechargeMapperDatabase } from "../database/mapper/recharge.mapper.database";
import { TransactionEntity } from "../database/entities/transaction.entity";
import { IRechargeRepository } from "@recharge/domain/use-cases/recharge.repository.interface";

/**
 * Implementation of the RechargeRepository interface using TypeORM.
 */
@Injectable()
export class RechargeRepositoryImpl implements IRechargeRepository {

    private readonly logger = new Logger(RechargeRepositoryImpl.name);

    constructor(
        @InjectRepository(TransactionEntity)
        private readonly rechargeRepo: Repository<TransactionEntity>,
    ) {}

    /**
     * @inheritDoc
     */
    async save(recharge: Recharge): Promise<Recharge> {

        const entity = RechargeMapperDatabase.toEntity(recharge);
        const saved = await this.rechargeRepo.save(entity);

        this.logger.debug(`Recharge with id=${saved.id} saved successfully in the database`);
        return RechargeMapperDatabase.toDomain(saved);
    }

    /**
     * @inheritDoc
     */
    async findAllByUserId(userId: string): Promise<Recharge[]> {

        const entities = await this.rechargeRepo.findBy({ userId } );
        return entities.map(RechargeMapperDatabase.toDomain);
    }

    /**
     * @inheritDoc
     */
    async updateStatus(id: string, status: string, responseProvider: string): Promise<void> {

        const updatedAt = new Date();
        await this.rechargeRepo.update(id, { status , responseProvider, updatedAt });
    }
}
