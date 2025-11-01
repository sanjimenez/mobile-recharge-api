import { RechargeRepositoryImpl } from "./recharge.repository.impl";
import { RechargeMapperDatabase } from "../database/mapper/recharge.mapper.database";
import { TransactionEntity } from "../database/entities/transaction.entity";
import { Repository, UpdateResult } from "typeorm";
import { Recharge } from "@recharge/domain/models/recharge.model";
import { RechargeMockFactory } from "@recharge/__mocks__/recharge.mock";
import { RechargeEntityMockFactory } from "@recharge/__mocks__/recharge.entity.mock";

jest.mock("../database/mapper/recharge.mapper.database");

/**
 * Unit tests for RechargeRepositoryImpl.
 */
describe("RechargeRepositoryImpl", () => {
  let repo: jest.Mocked<Repository<TransactionEntity>>;
  let rechargeRepository: RechargeRepositoryImpl;

  beforeEach(() => {
    repo = {
      save: jest.fn(),
      findBy: jest.fn(),
      update: jest.fn(),
    } as any;
    rechargeRepository = new RechargeRepositoryImpl(repo);
  });

  it("save should save and return the domain object", async () => {
    const recharge = RechargeMockFactory.createRecharge();
    const entity: TransactionEntity = RechargeEntityMockFactory.createRechargeID("1");
    const savedEntity: TransactionEntity =
      RechargeEntityMockFactory.createRechargeID("1");
    const domain: Recharge = { ...recharge };

    (RechargeMapperDatabase.toEntity as jest.Mock).mockReturnValue(entity);
    repo.save.mockResolvedValue(savedEntity);
    (RechargeMapperDatabase.toDomain as jest.Mock).mockReturnValue(domain);

    const result = await rechargeRepository.save(recharge);

    expect(RechargeMapperDatabase.toEntity).toHaveBeenCalledWith(recharge);
    expect(repo.save).toHaveBeenCalledWith(entity);
    expect(RechargeMapperDatabase.toDomain).toHaveBeenCalledWith(savedEntity);
    expect(result).toBe(domain);
  });

  it("findAllByUserId should return a list of domain objects", async () => {
    const userId = "user-1";
    const entities: TransactionEntity[] = [
      RechargeEntityMockFactory.createRechargeID("1"),
      RechargeEntityMockFactory.createRechargeID("2"),
    ];

    repo.findBy.mockResolvedValue(entities);

    await rechargeRepository.findAllByUserId(userId);

    expect(repo.findBy).toHaveBeenCalledWith({ userId });
  });

  it("updateStatus should call update with correct parameters", async () => {
    const id = "1";
    const status = "SUCCESS";
    const responseProvider = "provider";
    repo.update.mockResolvedValue({} as UpdateResult);

    await rechargeRepository.updateStatus(id, status, responseProvider);

    expect(repo.update).toHaveBeenCalledWith(
      id,
      expect.objectContaining({
        status,
        responseProvider,
        updatedAt: expect.any(Date),
      }),
    );
  });
});
