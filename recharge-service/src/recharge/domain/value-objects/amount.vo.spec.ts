import { AmountVO } from "./amount.vo";
import { RechargeOutOfRangeException } from "../exceptions/recharge.out.of.range.exception";

/**
 * Unit tests for the AmountVO value object.
 */
describe('AmountVO', () => {

    it('should create an AmountVO when amount is within range', () => {
        // Arrange
        const validAmount = 5000;

        // Act
        const amountVO = new AmountVO(validAmount);

        // Assert
        expect(amountVO.value).toBe(validAmount);
    });

    it('should throw RechargeOutOfRangeException when amount is too low', () => {
        // Arrange
        const tooLowAmount = 1000;

        // Act & Assert
        expect(() => new AmountVO(tooLowAmount)).toThrow(RechargeOutOfRangeException);
        expect(() => new AmountVO(tooLowAmount)).toThrow('Recharge amount is out of allowed range');
    });

    it('should throw RechargeOutOfRangeException when amount is too high', () => {
        // Arrange
        const tooHighAmount = 200000;

        // Act & Assert
        expect(() => new AmountVO(tooHighAmount)).toThrow(RechargeOutOfRangeException);
        expect(() => new AmountVO(tooHighAmount)).toThrow('Recharge amount is out of allowed range');
    });

    it('should return correct JSON representation', () => {
        // Arrange
        const validAmount = 15000;
        const amountVO = new AmountVO(validAmount);

        // Act
        const json = amountVO.toJSON();

        // Assert
        expect(json).toEqual({ value: validAmount });
    });
});
