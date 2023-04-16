import NonEmptyString from '../exclusive/nonEmptyString';
import Not from '../exclusive/not';

export function isNull(input: unknown): boolean {
  return input === null;
}

export function isNonNull(input: unknown): boolean {
  return !isNull(input);
}

export function isDefined(input: unknown): boolean {
  return input !== undefined;
}

export function isUndefined(input: unknown): boolean {
  return !isDefined(input);
}

export function requireNonNull<T>(
  input: T,
  errorMessage?: string,
): Not<T, null> {
  if (isNonNull(input)) {
    return input as Not<T, null>;
  }

  throw new Error(
    errorMessage === undefined
      ? `Input value ${input} must be non-null.`
      : errorMessage,
  );
}

export function requireDefined<T>(
  input: T,
  errorMessage?: string,
): Not<T, undefined> {
  if (isDefined(input)) {
    return input as Not<T, undefined>;
  }

  throw new Error(
    errorMessage === undefined
      ? `Input value ${input} must be defined.`
      : errorMessage,
  );
}

export function requireNonNullDefined<T>(
  input: T,
  errorMessage?: string,
): Not<Not<T, undefined>, null> {
  return requireNonNull(requireDefined(input, errorMessage), errorMessage);
}

export function checkArgument(
  condition: boolean,
  errorMessage: NonEmptyString,
): void {
  if (condition) {
    return;
  }

  throw new Error(errorMessage);
}
