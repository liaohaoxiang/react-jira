export const isFalsy = (value: any) => (value === 0 ? false : !value);

export const cleanObject = (obj: any) => {
  const result = { ...obj };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isFalsy(value)) {
      delete result[key];
    }
  });
  return result;
};
