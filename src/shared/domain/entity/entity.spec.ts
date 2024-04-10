import { validate as uuidValidate } from "uuid";
import { UniqueEntityId } from "../value-objects/unique-entity-id";
import { Entity } from "./entity";

class StubEntity extends Entity<{ prop1: string; prop2: number }> {}

describe("Entity Unit Tests", () => {
  it("should set props and id", () => {
    const arrange = { prop1: "value", prop2: 1 };
    const sut = new StubEntity(arrange);

    expect(sut.props).toStrictEqual(arrange);
    expect(sut.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
    expect(sut.id).not.toBeNull();
    expect(uuidValidate(sut.id)).toBeTruthy();
  });

  it("should accept a valid uuid", () => {
    const uniqueEntityId = new UniqueEntityId();
    const arrange = { prop1: "value", prop2: 1 };
    const sut = new StubEntity(arrange, uniqueEntityId);

    expect(sut.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
    expect(sut.id).toBe(uniqueEntityId.value);
  });

  it("should convert an entity to a JSON", () => {
    const uniqueEntityId = new UniqueEntityId();
    const arrange = { prop1: "value", prop2: 1 };
    const sut = new StubEntity(arrange, uniqueEntityId);

    expect(sut.toJSON()).toStrictEqual({
      id: sut.id,
      prop1: "value",
      prop2: 1,
    });
  });
});
