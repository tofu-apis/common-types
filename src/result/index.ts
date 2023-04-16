export default class Result<T, E extends Error> {
  private value: T | null;
  private error: E | null;

  private constructor(value: T | null, error: E | null) {
    if (
      (value === null && error === null) ||
      (value !== null && error !== null)
    ) {
      throw new Error('Result cannot be both Ok and Err');
    }

    this.value = value;
    this.error = error;
  }

  static ok<T, E extends Error>(value: T): Result<T, E> {
    return new Result<T, E>(value, null);
  }

  static err<T, E extends Error>(error: E): Result<T, E> {
    return new Result<T, E>(null, error);
  }

  isOk(): boolean {
    return this.error === null;
  }

  isErr(): boolean {
    return this.error !== null;
  }

  ok(): T {
    if (this.isOk()) {
      return this.value as T;
    } else {
      throw new Error('Called ok() on an Err variant of Result');
    }
  }

  err(): E {
    if (this.isErr()) {
      return this.error as E;
    } else {
      throw new Error('Called err() on an Ok variant of Result');
    }
  }
}
