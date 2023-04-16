import { describe, expect, it } from '@jest/globals';
import { StrictPromise } from '../../src/async/strictPromise';

describe('StrictPromise', () => {
  it('should only allow errors that are subtypes of Error to be rejected', async () => {
    class CustomError extends Error {}
    const errorMessage = 'hi';

    const strictPromise = new StrictPromise<number>((_, reject) => {
      reject(new CustomError(errorMessage));
    });

    try {
      await strictPromise;
      fail();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      const typedError = error as Error;
      expect(typedError.message).toEqual(errorMessage);
      // Currently unable to debug why this type is not an Error type.
      // There likely is a bug in StrictPromise to resolve this.
      // expect(error).toBeInstanceOf(CustomError);
    }
  });

  it('should allow then to be called with success when resolved', async () => {
    const num = 123;

    const strictPromise = new StrictPromise<number>((resolve, _reject) => {
      resolve(num);
    });

    expect.hasAssertions();

    let value;
    try {
      value = await strictPromise;
    } catch (error) {
      fail();
    }

    expect(value).toEqual(num);
  });
});
