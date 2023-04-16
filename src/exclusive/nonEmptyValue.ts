import Not from './not';

type NonEmptyValue<T> = T & Not<T, null> & Not<T, undefined>;

export default NonEmptyValue;
