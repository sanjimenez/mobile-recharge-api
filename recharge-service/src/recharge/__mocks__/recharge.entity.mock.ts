import { TransactionEntity } from "@recharge/infrastructure/out/database/entities/transaction.entity";

/**
 * Factory class to create mock TransactionEntity objects for testing.
 */
export class RechargeEntityMockFactory {

  /**
   * Creates a mock TransactionEntity instance with default or overridden values.
   * @param id
   */
  static createRechargeID(id: string): TransactionEntity {

      const entity = new TransactionEntity();
      entity.id = id
      entity.userId = 'user';
      entity.phoneNumber = '3001234567';
      entity.amount = 5500;
      entity.status = 'PENDING';
      entity.createdAt = new Date();
      entity.responseProvider = '{}';
      return entity;
    }
}
