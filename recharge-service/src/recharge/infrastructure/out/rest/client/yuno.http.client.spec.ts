import { YunoHttpClient } from "./yuno.http.client";
import { HttpService } from "@nestjs/axios";
import { ConfigService } from "@nestjs/config";
import { RechargeYunoRequestDto } from "@recharge/infrastructure/out/rest/dto/recharge.yuno.request.dto";
import { ExternalProviderException } from "@recharge/domain/exceptions/external-provider.exception";
import { throwError } from "rxjs";
import { RechargeYunoRequestMock } from "@recharge/__mocks__/recharge.yuno.request.mock";

describe("YunoHttpClient", () => {
  let httpService: jest.Mocked<HttpService>;
  let configService: jest.Mocked<ConfigService>;
  let client: YunoHttpClient;

  beforeEach(() => {
    httpService = { post: jest.fn() } as any;
    configService = { get: jest.fn() } as any;
    client = new YunoHttpClient(httpService, configService);
  });

  it("should throw ExternalProviderException on error", async () => {
    const payload: RechargeYunoRequestDto =
      RechargeYunoRequestMock.createRechargeYunoRequestDto();
    configService.get.mockReturnValue("http://test-url/");
    const error = {
      response: { statusText: "Bad Request" },
      message: "Network error",
    };

    httpService.post.mockReturnValue(throwError(() => error));

    await expect(client.postRecharge(payload)).rejects.toThrow(
      ExternalProviderException,
    );
    await expect(client.postRecharge(payload)).rejects.toThrow(
      "Failed to send recharge to operator: Bad Request",
    );
  });
});
