export function deepFreeze(obj: any): any {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  Object.getOwnPropertyNames(obj).forEach((name) => {
    const prop = obj[name];

    if (typeof prop === "object" && prop !== null) {
      deepFreeze(prop);
    }
  });

  return Object.freeze(obj);
}
