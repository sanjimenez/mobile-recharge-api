import { PhoneException } from "@recharge/domain/exceptions/phone.exception";
import { PhoneNumberVo } from "@recharge/domain/value-objects/phone.number.vo";

/**
 * Unit tests for the PhoneNumberVo value object.
 */
describe("PhoneNumberVo", () => {

  it("should create a PhoneNumberVo when phone number is valid", () => {
    // Arrange
    const validPhone = "3001234567";

    // Act
    const phoneVO = new PhoneNumberVo(validPhone);

    // Assert
    expect(phoneVO.value).toBe(validPhone);
  });

  it("should throw PhoneException when phone number has fewer than 10 digits", () => {
    // Arrange
    const invalidPhone = "30012345";

    // Act & Assert
    expect(() => new PhoneNumberVo(invalidPhone)).toThrow(PhoneException);
    expect(() => new PhoneNumberVo(invalidPhone)).toThrow(
      "The phone number must start with 3, have 10 digits, and be numeric only.",
    );
  });

  it("should throw PhoneException when phone number contains letters", () => {
    // Arrange
    const invalidPhone = "30A1234567";

    // Act & Assert
    expect(() => new PhoneNumberVo(invalidPhone)).toThrow(PhoneException);
    expect(() => new PhoneNumberVo(invalidPhone)).toThrow(
      "The phone number must start with 3, have 10 digits, and be numeric only.",
    );
  });

  it("should throw PhoneException when phone number does not start with 3", () => {
    // Arrange
    const invalidPhone = "4123456789";

    // Act & Assert
    expect(() => new PhoneNumberVo(invalidPhone)).toThrow(PhoneException);
    expect(() => new PhoneNumberVo(invalidPhone)).toThrow(
      "The phone number must start with 3, have 10 digits, and be numeric only.",
    );
  });

  it("should return correct JSON representation", () => {
    // Arrange
    const validPhone = "3216549870";
    const phoneVO = new PhoneNumberVo(validPhone);

    // Act
    const json = phoneVO.toJSON();

    // Assert
    expect(json).toEqual({ value: validPhone });
  });
});
