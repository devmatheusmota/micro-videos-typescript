import { deepFreeze } from "../utils/object";

export abstract class ValueObject<T = any> {
  protected readonly _value: T;

  constructor(value: T) {
    this._value = deepFreeze(value);
  }

  get value(): T {
    return this._value;
  }

  toString = () => {
    if (typeof this.value !== "object" || this.value === null) {
      try {
        return this.value.toString();
      } catch (error) {
        return this.value + "";
      }
    }

    const valueStr = this.value.toString();
    return valueStr === "[object Object]"
      ? JSON.stringify(this.value)
      : valueStr;
  };
}
