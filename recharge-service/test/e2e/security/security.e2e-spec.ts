import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { LoginUseCase } from "@security/application/use-cases/login.usecase";
import { SecurityController } from "@security/infrastructure/in/rest/controllers/security.controller";


describe('SecurityController (e2e)', () => {
  let app: INestApplication;
  let loginUseCase: LoginUseCase;

  beforeAll(async () => {
    const loginUseCaseMock = {
      execute: jest.fn().mockResolvedValue('mocked-jwt-token'),
    };

    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [SecurityController],
      providers: [
        { provide: LoginUseCase, useValue: loginUseCaseMock },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    loginUseCase = moduleFixture.get<LoginUseCase>(LoginUseCase);
  });

  afterAll(async () => {
    await app.close();
  });

  it('/auth/login (POST) should return access_token', async () => {

    const userDto = { username: 'testuser', password: 'testpass' };

    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send(userDto)
      .expect(201);

    expect(response.body).toEqual({ access_token: 'mocked-jwt-token' });
    expect(loginUseCase.execute).toHaveBeenCalledWith(expect.any(Object));
  });

  it('/auth/login (POST) should fail if password is missing', async () => {
    const userDto = { username: 'testuser' };

    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send(userDto)
      .expect(400);

    expect(response.body).toHaveProperty('message');
  });
});
