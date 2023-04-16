import { Not } from './not';

export type NonEmptyValue<T> = T & Not<T, null> & Not<T, undefined>;
