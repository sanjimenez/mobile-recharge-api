import { Test, TestingModule } from "@nestjs/testing";
import { RechargeController } from "./recharge.controller";
import { CreateRechargeUseCase } from "@recharge/application/use-cases/create-recharge.usecase";
import { GetRechargesUseCase } from "@recharge/application/use-cases/get-recharges.usecase";
import { RechargeMapperDto } from "../mapper/recharge.mapper.dto";
import { RechargeRequestDto } from "../dtos/recharge-request.dto";

/**
 * Unit tests for the RechargeController.
 */
describe('RechargeController', () => {
    let controller: RechargeController;
    let createRechargeUseCase: CreateRechargeUseCase;
    let getRechargesUseCase: GetRechargesUseCase;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [RechargeController],
            providers: [
                {
                    provide: CreateRechargeUseCase,
                    useValue: { execute: jest.fn() },
                },
                {
                    provide: GetRechargesUseCase,
                    useValue: { execute: jest.fn() },
                },
            ],
        }).compile();

        controller = module.get<RechargeController>(RechargeController);
        createRechargeUseCase = module.get<CreateRechargeUseCase>(CreateRechargeUseCase);
        getRechargesUseCase = module.get<GetRechargesUseCase>(GetRechargesUseCase);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('create', () => {
        it('should create a recharge and return a success message', async () => {
            // Arrange
            const requestDto: RechargeRequestDto = {
                phoneNumber: '3001234567',
                amount: 10000,
            } as any;

            const username = 'john_doe';
            const mockRechargeDomain = { id: { value: 'abc-1235' } } as any;
            const mockResponseDto = { id: 'abc-1234', amount: 10000 } as any;

            jest.spyOn(RechargeMapperDto, 'toDomain').mockReturnValue(mockRechargeDomain);
            jest.spyOn(createRechargeUseCase, 'execute').mockResolvedValue(mockRechargeDomain);
            jest.spyOn(RechargeMapperDto, 'toResponseDto').mockReturnValue(mockResponseDto);

            // Act
            const result = await controller.create(requestDto, username);

            // Assert
            expect(RechargeMapperDto.toDomain).toHaveBeenCalledWith(requestDto, username);
            expect(createRechargeUseCase.execute).toHaveBeenCalledWith(mockRechargeDomain);
            expect(result).toEqual({
                message: 'Recharge created successfully',
                data: mockResponseDto,
            });
        });

        it('should log and throw if use case fails', async () => {
            const requestDto: RechargeRequestDto = { phoneNumber: '3001234567', amount: 10000 } as any;
            const username = 'john_doe';
            const mockRechargeDomain = { id: { value: 'abc-12' } } as any;

            jest.spyOn(RechargeMapperDto, 'toDomain').mockReturnValue(mockRechargeDomain);
            jest.spyOn(createRechargeUseCase, 'execute').mockRejectedValue(new Error('Unexpected error'));

            await expect(controller.create(requestDto, username)).rejects.toThrow('Unexpected error');
        });
    });

    describe('getByUser', () => {
        it('should return recharge history for a user', async () => {
            // Arrange
            const username = 'john_doe';
            const mockRecharges = [
                { id: { value: '1' }, amount: 5000 },
            ] as any;
            const mockResponseDtos = [
                { id: '1', amount: 5000 },
            ];

            const mockResponseDto = { id: '1', amount: 5000 } as any;

            jest.spyOn(getRechargesUseCase, 'execute').mockResolvedValue(mockRecharges);
            jest.spyOn(RechargeMapperDto, 'toResponseDto').mockReturnValue(mockResponseDto);

            // Act
            const result = await controller.findRechargeByUser(username);

            // Assert
            expect(getRechargesUseCase.execute).toHaveBeenCalledWith(username);
            expect(result).toEqual(mockResponseDtos);
        });
    });
});
