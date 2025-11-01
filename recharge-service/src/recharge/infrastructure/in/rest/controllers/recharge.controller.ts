import { Body, Controller, Get, Logger, Post, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { CreateRechargeUseCase } from "@recharge/application/use-cases/create-recharge.usecase";
import { RechargeRequestDto } from "../dtos/recharge-request.dto";
import { RechargeMapperDto } from "../mapper/recharge.mapper.dto";
import { GetRechargesUseCase } from "@recharge/application/use-cases/get-recharges.usecase";
import { JwtAuthGuard } from "@security/infrastructure/in/rest/security/jwt-auth.guard";
import { GetUser } from "@recharge/shared/get-user.decorator";

/**
 * Controller responsible for handling HTTP requests related to recharges.
 */
@UseGuards(JwtAuthGuard)
@Controller('recharges')
export class RechargeController {

    private readonly logger = new Logger(RechargeController.name);

    constructor(
        private readonly createRechargeUseCase: CreateRechargeUseCase,
        private readonly getRechargesUseCase: GetRechargesUseCase
    ) {}

    /**
     * Handles the creation of a new recharge.
     *
     * @param requestDto       Input data for the recharge.
     * @param username  The username of the authenticated user.
     * @returns The created recharge object.
     */
    @Post("/buy")
    @UsePipes(new ValidationPipe({ whitelist: true }))
    async create(@Body() requestDto: RechargeRequestDto,  @GetUser('username') username: string) {

        const rechargeModel = RechargeMapperDto.toDomain(requestDto, username);
        this.logger.log(`User ${username} is creating a recharge with id: ${rechargeModel.id.value}`);
        const recharge = await this.createRechargeUseCase.execute(rechargeModel);
        this.logger.log(`Recharge created with id: ${recharge.id.value} successfully`);
        return {
            message: 'Recharge created successfully',
            data: RechargeMapperDto.toResponseDto(recharge),
        };
    }

    /**
     * Handles fetching recharge history for a specific user.
     *
     * @param username The username of the authenticated user.
     * @returns List of recharges for the user.
     */
    @Get('/history')
    async findRechargeByUser(@GetUser('username') username: string) {

        const recharges = await this.getRechargesUseCase.execute(username);
        return recharges.map(recharge => RechargeMapperDto.toResponseDto(recharge));
    }

}
