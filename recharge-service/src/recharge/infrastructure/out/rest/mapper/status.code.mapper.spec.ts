import { StatusCodeMapper } from "./status.code.mapper";
import { RechargeStatus } from "@recharge/domain/models/recharge.status";

describe("StatusCodeMapper", () => {
  describe("toInternalStatus", () => {
    it("should map success codes correctly", () => {
      expect(StatusCodeMapper.toInternalStatus("00")).toBe(
        RechargeStatus.SUCCESS,
      );
      expect(StatusCodeMapper.toInternalStatus("SUCCESS")).toBe(
        RechargeStatus.SUCCESS,
      );
    });

    it("should map failed/declined codes correctly", () => {
      expect(StatusCodeMapper.toInternalStatus("C1")).toBe(
        RechargeStatus.DECLINED,
      );
      expect(StatusCodeMapper.toInternalStatus("C2")).toBe(
        RechargeStatus.FAILED,
      );
      expect(StatusCodeMapper.toInternalStatus("DECLINED")).toBe(
        RechargeStatus.DECLINED,
      );
      expect(StatusCodeMapper.toInternalStatus("FAILED")).toBe(
        RechargeStatus.FAILED,
      );
    });

    it("should map pending codes correctly", () => {
      expect(StatusCodeMapper.toInternalStatus("PENDING")).toBe(
        RechargeStatus.PENDING,
      );
    });
  });
});