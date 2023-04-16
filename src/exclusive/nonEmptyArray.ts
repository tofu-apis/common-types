export type NonEmptyArray<T> = [T, ...T[]];

function isNonZeroLengthArray<T>(array: T[]): array is NonEmptyArray<T> {
  return array.length > 0;
}

function requireArrayNonEmpty<T>(array: T[]): void {
  if (isNonZeroLengthArray(array)) {
    return;
  }

  throw new Error(`Input array ${array} must be non-empty.`);
}

export function castToNonEmptyArray<T>(inputArray: T[]): NonEmptyArray<T> {
  requireArrayNonEmpty(inputArray);

  return inputArray as NonEmptyArray<T>;
}
