import { Not } from './not';
import {
  checkArgument,
  isDefined,
  isNonNull,
  requireDefined,
  requireNonNull,
} from '../preconditions';

type EmptyString = '';

export type NonEmptyString = Not<string, EmptyString> & string;

function isNonZeroLengthString(inputString: string): boolean {
  return inputString.length > 0;
}

export function isNonEmptyString(input: string | null | undefined): boolean {
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
  inputString: string | null | undefined,
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
