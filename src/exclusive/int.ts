export type Int = number & { __int__: void };

export const roundToInt = (num: number): Int => Math.round(num) as Int;

export const stringToInt = (value: string): Int => {
  if (!isStringInt(value)) {
    throw new Error(`Invalid int string ${value}`);
  }

  return Number.parseInt(value) as Int;
};

export const isStringInt = (value: string): boolean => {
  const parsedString = Number.parseInt(value);
  if (isNaN(parsedString)) {
    throw new Error(`Input int string ${value} is NaN`);
  }

  return isInt(parsedString);
};

export const isInt = (num: number): num is Int => num % 1 === 0;

export const castToInt = (num: number): Int => {
  try {
    if (isInt(num)) {
      return num;
    }
  } catch (err) {
    throw new Error(`Invalid Int value [${num}] with error ${err}`);
  }

  throw new Error(`Invalid Int value: ${num}`);
};
