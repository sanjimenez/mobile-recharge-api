import { IRechargeRepository } from "@recharge/domain/use-cases/recharge.repository.interface";
import { IRechargeProvider } from "@recharge/domain/use-cases/recharge.provider.interface";
import { Recharge } from "@recharge/domain/models/recharge.model";
import { RechargeStatus } from "@recharge/domain/models/recharge.status";
import { RechargeCreationException } from "@recharge/domain/exceptions/recharge.creation.exception";
import { CreateRechargeUseCase } from "@recharge/application/use-cases/create-recharge.usecase";
import { RechargeMockFactory } from "@recharge/__mocks__/recharge.mock";

/**
 * Unit tests for the CreateRechargeUseCase.
 */
describe('CreateRechargeUseCase', () => {
    let useCase: CreateRechargeUseCase;
    let rechargeRepository: jest.Mocked<IRechargeRepository>;
    let rechargeProvider: jest.Mocked<IRechargeProvider>;

    const mockRecharge: Recharge = RechargeMockFactory.createRecharge();

    beforeEach(() => {

        rechargeRepository = {
            save: jest.fn(),
            updateStatus: jest.fn(),
        } as any;

        rechargeProvider = {
            send: jest.fn(),
        } as any;

        useCase = new CreateRechargeUseCase(rechargeRepository, rechargeProvider);
    });

    it('should create a recharge successfully', async () => {

        // Arrange
        const processedRecharge = {
            ...mockRecharge,
            status: RechargeStatus.SUCCESS,
            networkResponse: 'OK',
        };

        rechargeRepository.save.mockResolvedValue(mockRecharge);
        rechargeProvider.send.mockResolvedValue(processedRecharge);
        rechargeRepository.updateStatus.mockResolvedValue(undefined);

        // Act
        const result = await useCase.execute(mockRecharge);

        // Assert
        expect(rechargeRepository.save).toHaveBeenCalledWith(mockRecharge);

        expect(rechargeProvider.send).toHaveBeenCalledWith(mockRecharge);

        expect(rechargeRepository.updateStatus).toHaveBeenCalledWith(
            processedRecharge.id.value,
            RechargeStatus.SUCCESS,
            processedRecharge.networkResponse,
        );

        expect(result).toEqual(processedRecharge);
    });

    it('should update status to FAILED and throw RechargeCreationException if an error occurs', async () => {
        // Arrange
        rechargeRepository.save.mockResolvedValue(mockRecharge);
        rechargeProvider.send.mockRejectedValue(new Error('Provider error'));
        rechargeRepository.updateStatus.mockResolvedValue(undefined);

        // Act & Assert
        await expect(useCase.execute(mockRecharge)).rejects.toThrow(RechargeCreationException);

        expect(rechargeRepository.updateStatus).toHaveBeenCalledWith(
            mockRecharge.id.value,
            RechargeStatus.FAILED,
            'Provider error',
        );
    });
});
