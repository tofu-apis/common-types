import { Int, castToInt, isInt } from './int';

export type NonNegativeInt = Int & { __nonNegativeInt__: void };

export const isNonNegative = (int: Int): int is NonNegativeInt => int >= 0;

export const isNonNegativeInt = (num: number): num is NonNegativeInt => {
  if (!isInt(num)) {
    return false;
  }

  const int: Int = castToInt(num);

  return isNonNegative(int);
};

export const castToNonNegative = (int: Int): NonNegativeInt => {
  if (isNonNegative(int)) {
    return int;
  }

  throw new Error(`Invalid NonNegativeInt value ${int}`);
};

export const castToNonNegativeInt = (num: number): NonNegativeInt => {
  const int: Int = castToInt(num);

  return castToNonNegative(int);
};
