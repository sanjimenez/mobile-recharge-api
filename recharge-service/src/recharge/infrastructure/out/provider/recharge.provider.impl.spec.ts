import { YunoHttpClient } from "@recharge/infrastructure/out/rest/client/yuno.http.client";
import { RechargeProviderImpl } from "@recharge/infrastructure/out/provider/recharge.provider.impl";
import { RechargeMockFactory } from "../../../__mocks__/recharge.mock";
import { RechargeYunoResponseMock } from "@recharge/__mocks__/recharge.yuno.response.mock";

/**
 * Unit tests for the RechargeProviderImpl class.
 */
describe('RechargeProviderImpl', () => {
    let provider: RechargeProviderImpl;
    let httpClient: jest.Mocked<YunoHttpClient>;

    beforeEach(() => {
        httpClient = {
            postRecharge: jest.fn(),
        } as any;

        provider = new RechargeProviderImpl(httpClient);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should send recharge and return updated model on success', async () => {
        // Arrange
        const recharge = RechargeMockFactory.createRecharge();
        const operatorResponse = RechargeYunoResponseMock.createRechargeYunoResponseDto();
        httpClient.postRecharge.mockResolvedValue(operatorResponse);

        // Act
        const result = await provider.send(recharge);

        // Assert
      // Assert
      const parsedResponse = typeof result.networkResponse === 'string'
        ? JSON.parse(result.networkResponse)
        : result.networkResponse;
        expect(result.status).toBe('SUCCESS');
        expect(parsedResponse).toEqual(operatorResponse);
    });

    it('should propagate error if HTTP client fails', async () => {
        // Arrange
        const error = new Error('Network error');
        httpClient.postRecharge.mockRejectedValue(error);

        // Act & Assert
        await expect(provider.send(RechargeMockFactory.createRecharge())).rejects.toThrow('Network error');
    });
});
