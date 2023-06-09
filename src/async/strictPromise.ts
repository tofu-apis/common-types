export class StrictPromise<T> {
  private promise: Promise<T>;

  constructor(
    executor: (
      resolve: (value: PromiseLike<T> | T) => void,
      reject: (reason: Error) => void,
    ) => void,
  ) {
    this.promise = new Promise((resolve, reject) => {
      executor(resolve, (reason: unknown) => {
        if (reason instanceof Error) {
          reject(reason as Error);
        } else {
          throw new TypeError('Error must be an instance of Error');
        }
      });
    });
  }

  catch<U>(onRejected: (error: Error) => U): StrictPromise<T> {
    return new StrictPromise((_unusedResolve, _unusedReject) => {
      this.promise.catch((error: Error) => {
        if (error instanceof Error) {
          onRejected(error as Error);
        } else {
          throw new TypeError('Error must be an instance of Error');
        }
      });
    });
  }

  then<U>(
    onFulfilled?: ((value: T) => PromiseLike<U> | U) | null | undefined,
    onRejected?: ((reason: Error) => PromiseLike<U> | U) | null | undefined,
  ): StrictPromise<U> {
    return new StrictPromise((resolve, reject) => {
      this.promise.then(
        (value: T) => {
          if (onFulfilled) {
            resolve(onFulfilled(value));
          } else {
            resolve(value as unknown as PromiseLike<U> | U);
          }
        },
        (reason: Error) => {
          if (reason instanceof Error) {
            if (onRejected) {
              resolve(onRejected(reason));
            } else {
              reject(reason);
            }
          } else {
            throw new TypeError('Error must be an instance of Error');
          }
        },
      );
    });
  }
}
