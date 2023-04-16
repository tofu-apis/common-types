type NonEmptyArray<T> = [T, ...T[]];

function isNonZeroLengthArray<T>(array: T[]): array is NonEmptyArray<T> {
  return array.length > 0;
}

export function requireArrayNonEmpty<T>(
  array: T[],
  errorMessage?: string,
): NonEmptyArray<T> {
  if (isNonZeroLengthArray(array)) {
    return array as NonEmptyArray<T>;
  }

  throw new Error(
    errorMessage === undefined
      ? `Input array ${array} must be non-empty.`
      : errorMessage,
  );
}

export default NonEmptyArray;
