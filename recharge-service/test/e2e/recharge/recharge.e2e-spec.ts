import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import request from "supertest";
import { RechargeController } from "@recharge/infrastructure/in/rest/controllers/recharge.controller";
import { CreateRechargeUseCase } from "@recharge/application/use-cases/create-recharge.usecase";
import { GetRechargesUseCase } from "@recharge/application/use-cases/get-recharges.usecase";
import { JwtAuthGuard } from "@security/infrastructure/in/rest/security/jwt-auth.guard";
import { RechargeMockFactory } from "@recharge/__mocks__/recharge.mock";

describe("RechargeController (e2e)", () => {

  let app: INestApplication;
  let createRechargeUseCase: CreateRechargeUseCase;
  let getRechargesUseCase: GetRechargesUseCase;

  beforeAll(async () => {
    const createRechargeUseCaseMock = {
      execute: jest
        .fn()
        .mockResolvedValue(RechargeMockFactory.createRecharge()),
    };
    const getRechargesUseCaseMock = {
      execute: jest
        .fn()
        .mockResolvedValue([RechargeMockFactory.createRecharge()]),
    };

    const JwtAuthGuardMock = {
      canActivate: jest.fn().mockReturnValue(true),
    };

    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [RechargeController],
      providers: [
        { provide: CreateRechargeUseCase, useValue: createRechargeUseCaseMock },
        { provide: GetRechargesUseCase, useValue: getRechargesUseCaseMock },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue(JwtAuthGuardMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    createRechargeUseCase = moduleFixture.get<CreateRechargeUseCase>(
      CreateRechargeUseCase,
    );
    getRechargesUseCase =
      moduleFixture.get<GetRechargesUseCase>(GetRechargesUseCase);
  });

  afterAll(async () => {
    await app.close();
  });

  it("/recharges/buy (POST) should create a recharge", async () => {
    const rechargeDto = { phoneNumber: "3001234567", amount: 10000 };

    const response = await request(app.getHttpServer())
      .post("/recharges/buy")
      .set("Authorization", "Bearer test-token")
      .send(rechargeDto);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty(
      "message",
      "Recharge created successfully",
    );
    expect(response.body.data).toHaveProperty("id", "1");
    expect(createRechargeUseCase.execute).toHaveBeenCalled();
  });

  it("/recharges/history (GET) should return recharge history", async () => {
    const response = await request(app.getHttpServer())
      .get("/recharges/history")
      .set("Authorization", "Bearer test-token");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body[0]).toHaveProperty("id", "1");
    expect(getRechargesUseCase.execute).toHaveBeenCalled();
  });

  it("/recharges/buy (POST) should fail if phoneNumber is missing", async () => {
    const rechargeDto = { amount: 10000 };

    const response = await request(app.getHttpServer())
      .post("/recharges/buy")
      .set("Authorization", "Bearer test-token")
      .send(rechargeDto);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  it("/recharges/buy (POST) should fail if amount is missing", async () => {
    const rechargeDto = { phoneNumber: "3001234567" };

    const response = await request(app.getHttpServer())
      .post("/recharges/buy")
      .set("Authorization", "Bearer test-token")
      .send(rechargeDto);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });


});
