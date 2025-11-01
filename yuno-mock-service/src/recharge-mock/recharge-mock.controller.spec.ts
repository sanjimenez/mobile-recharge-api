import { Test, TestingModule } from '@nestjs/testing';
import { RechargeMockController } from './recharge-mock.controller';

describe('RechargeMockController', () => {
  let controller: RechargeMockController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RechargeMockController],
    }).compile();

    controller = module.get<RechargeMockController>(RechargeMockController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
