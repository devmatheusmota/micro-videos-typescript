import { validate as validateUUID } from "uuid";
import InvalidUuidError from "./../../../errors/invalid-uuid.error";
import { UniqueEntityId } from "./../unique-entity-id";

describe("UniqueEntityID", () => {
  const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, "validate");

  it("should throw error when uuid is invalid", () => {
    const sut = () => new UniqueEntityId("invalid-uuid");

    expect(sut).toThrow(new InvalidUuidError());
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });

  it("should accept a uuid on constructor", () => {
    const uuid = "f4e7b3a7-1b8e-4b7a-bf7d-7f2f7b7a4e0f";
    const uniqueEntityId = new UniqueEntityId(uuid);
    expect(uniqueEntityId.value).toBe(uuid);
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });

  it("should generate a uuid when none is provided", () => {
    const uniqueEntityId = new UniqueEntityId();

    expect(uniqueEntityId.value).toBeDefined();
    expect(validateUUID(uniqueEntityId.value)).toBe(true);
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });
});
