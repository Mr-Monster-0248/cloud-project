export function filterUndefinedProperty<T>(obj: T) {
  return Object.keys(obj).reduce((acc, key) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (obj[key] === undefined) return acc;
    return {
      ...acc,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      [key]: obj[key]
    };
  }, {});
}
