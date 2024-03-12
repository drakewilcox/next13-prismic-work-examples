type Data = Record<string, any>;

export function camelizeKeys(obj: Data): Data {
  if (Array.isArray(obj)) {
    return obj.map((v) => camelizeKeys(v));
  }

  if (obj !== null && typeof obj === "object") {
    return Object.keys(obj).reduce((result, key) => {
      const camelKey = key.replace(/_(\w)/g, (_, match) => match.toUpperCase());
      return {
        ...result,
        [camelKey]: camelizeKeys(obj[key]),
      };
    }, {});
  }

  return obj;
}
