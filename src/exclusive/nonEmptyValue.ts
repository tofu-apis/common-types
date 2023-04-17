import { Not } from './not';

export type NonEmptyValue<T> = Not<T, null> & Not<T, undefined> & T;
