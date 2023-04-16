import { describe, expect, it } from '@jest/globals';
import { Result } from '../../src//result';

class ExampleError extends Error {}

describe('Result', () => {
  describe('ok', () => {
    it('creates a Result with an Ok variant and the given value', () => {
      const num = 42;

      const result = Result.ok(num);
      expect(result.isOk()).toBe(true);
      expect(result.isErr()).toBe(false);
      expect(result.ok()).toBe(num);
    });
  });

  describe('err', () => {
    it('creates a Result with an Err variant and the given error', () => {
      const error = new ExampleError('Something went wrong');

      const result = Result.err(error);
      expect(result.isOk()).toBe(false);
      expect(result.isErr()).toBe(true);
      expect(result.err()).toEqual(error);
    });
  });

  describe('isOk', () => {
    it('returns true for an Ok variant', () => {
      const result = Result.ok(42);
      expect(result.isOk()).toBe(true);
    });

    it('returns false for an Err variant', () => {
      const result = Result.err(new ExampleError('Something went wrong'));
      expect(result.isOk()).toBe(false);
    });
  });

  describe('isErr', () => {
    it('returns false for an Ok variant', () => {
      const result = Result.ok(42);
      expect(result.isErr()).toBe(false);
    });

    it('returns true for an Err variant', () => {
      const result = Result.err(new ExampleError('Something went wrong'));
      expect(result.isErr()).toBe(true);
    });
  });

  describe('ok', () => {
    it('returns the value for an Ok variant', () => {
      const result = Result.ok(42);
      expect(result.ok()).toBe(42);
    });

    it('throws an error for an Err variant', () => {
      const result = Result.err(new ExampleError('Something went wrong'));
      expect(() => result.ok()).toThrowError(
        'Called ok() on an Err variant of Result',
      );
    });
  });

  describe('err', () => {
    it('throws an error for an Ok variant', () => {
      const result = Result.ok(42);
      expect(() => result.err()).toThrowError(
        'Called err() on an Ok variant of Result',
      );
    });

    it('returns the error for an Err variant', () => {
      const error = new ExampleError('Something went wrong');

      const result = Result.err(error);
      expect(result.err()).toEqual(error);
    });
  });
});
