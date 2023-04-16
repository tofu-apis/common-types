import { Not } from './not';
import {
  checkArgument,
  isDefined,
  isNonNull,
  requireDefined,
  requireNonNull,
} from '../preconditions';

type EmptyString = '';

export type NonEmptyString = string & Not<string, EmptyString>;

function isNonZeroLengthString(inputString: string): boolean {
  return inputString.length > 0;
}

export function isNonEmptyString(input: string | undefined | null): boolean {
  if (!isNonNull(input)) {
    return false;
  }

  if (!isDefined(input)) {
    return false;
  }

  const stringInput = input as string;
  return isNonZeroLengthString(stringInput);
}

export function castToNonEmptyString(
  inputString: string | undefined | null,
): NonEmptyString {
  requireNonNull(inputString);
  requireDefined(inputString);
  const definedNonNullString = inputString as string;

  checkArgument(
    isNonZeroLengthString(definedNonNullString),
    `Input string ${inputString} must be of non-zero length!`,
  );

  return definedNonNullString;
}
