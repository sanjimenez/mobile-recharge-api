import { Test, TestingModule } from "@nestjs/testing";
import { IRechargeRepository } from "@recharge/domain/use-cases/recharge.repository.interface";
import { RECHARGE_REPOSITORY } from "@recharge/shared/recharge.constants";
import { Recharge } from "@recharge/domain/models/recharge.model";
import { GetRechargesUseCase } from "@recharge/application/use-cases/get-recharges.usecase";
import { RechargeMockFactory } from "@recharge/__mocks__/recharge.mock";

/**
 * Unit tests for GetRechargesUseCase.
 */
describe('GetRechargesUseCase', () => {

    let useCase: GetRechargesUseCase;
    let rechargeRepository: jest.Mocked<IRechargeRepository>;

    beforeEach(async () => {

        rechargeRepository = {
            findAllByUserId: jest.fn(),
        } as unknown as jest.Mocked<IRechargeRepository>;

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GetRechargesUseCase,
                {
                    provide: RECHARGE_REPOSITORY,
                    useValue: rechargeRepository,
                },
            ],
        }).compile();

        useCase = module.get<GetRechargesUseCase>(GetRechargesUseCase);
    });

    it('should be defined', () => {
        expect(useCase).toBeDefined();
    });

    it('should return recharges for a given userId', async () => {
        // Arrange
        const userId = 'user-123';
        const mockRecharges: Recharge[] = [
          RechargeMockFactory.createRechargeID('1'),
          RechargeMockFactory.createRechargeID('2'),
        ];
        rechargeRepository.findAllByUserId.mockResolvedValue(mockRecharges);

        // Act
        const result = await useCase.execute(userId);

        // Assert
        expect(rechargeRepository.findAllByUserId).toHaveBeenCalledWith(userId);
        expect(result).toEqual(mockRecharges);
    });
});
