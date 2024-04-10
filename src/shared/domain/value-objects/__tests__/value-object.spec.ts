import { ValueObject } from "../value-object";

class StubValueObject extends ValueObject {
  constructor(value: any) {
    super(value);
  }
}

describe("ValueObject", () => {
  it("should set value", () => {
    const value1 = "value";
    const valueObject = new StubValueObject(value1);

    expect(valueObject.value).toBe(value1);

    const value2 = { key: "value" };
    const valueObject2 = new StubValueObject(value2);

    expect(valueObject2.value).toStrictEqual(value2);
  });

  it("should convert value to string", () => {
    const date = new Date();

    let arrange: { got: any; want: string }[] = [
      { got: null, want: "null" },
      { got: undefined, want: "undefined" },
      { got: "", want: "" },
      { got: "fake test", want: "fake test" },
      { got: 0, want: "0" },
      { got: 1, want: "1" },
      { got: 5, want: "5" },
      { got: true, want: "true" },
      { got: false, want: "false" },
      { got: date, want: date.toString() },
      { got: { prop1: "" }, want: JSON.stringify({ prop1: "" }) },
    ];

    arrange.forEach((arr) => {
      const stub = new StubValueObject(arr.got);
      const got = stub.toString();
      const want = arr.want;

      expect(got).toBe(want);
    });
  });

  it("should be a immutable object", () => {
    const obj = {
      prop1: "value",
      deep: {
        prop2: "value2",
        prop3: new Date(),
      },
    };

    const vo = new StubValueObject(obj);

    expect(() => {
      (vo as any).value = "changed";
    }).toThrow();
    expect(() => {
      (vo as any).value.deep.prop2 = "changed";
    }).toThrow();
    expect(typeof vo.value.deep.prop3).toBe("object");
    expect(vo.value.deep.prop3).toBeInstanceOf(Date);
  });
});
