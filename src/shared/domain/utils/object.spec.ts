import { deepFreeze } from "./object";

describe("Object Unit Tests", () => {
  it("should not freeze a scalar value", () => {
    const str = deepFreeze("a");

    expect(typeof str).toBe("string");

    const num = deepFreeze(1);

    expect(typeof num).toBe("number");

    let bool = deepFreeze(true);

    expect(typeof bool).toBe("boolean");

    bool = deepFreeze(false);

    expect(typeof bool).toBe("boolean");
  });

  it("should be a immutable object", () => {
    const obj = deepFreeze({
      prop1: "value",
      deep: {
        prop2: "value2",
        prop3: new Date(),
      },
    });

    expect(typeof obj).toBe("object");
    expect(() => {
      obj.prop1 = "changed";
    }).toThrow();
    expect(() => {
      obj.deep.prop2 = "changed";
    }).toThrow();
    expect(typeof obj.deep.prop3).toBe("object");
    expect(obj.deep.prop3).toBeInstanceOf(Date);
  });
});
