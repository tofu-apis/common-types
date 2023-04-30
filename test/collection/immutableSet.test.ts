import { ImmutableSet } from '../../src/collection/immutableSet';
import { describe, test, expect } from '@jest/globals';
import { requireArrayNonEmpty } from '../../src/exclusive';

describe(`${ImmutableSet.name}`, () => {
  test('constructs without error when no duplicates are provided', () => {
    const inputArray = requireArrayNonEmpty([1, 2, 3, 4, 5]);
    expect(() => new ImmutableSet(inputArray)).not.toThrow();
  });

  test('throws error when duplicates are provided', () => {
    const inputArray = requireArrayNonEmpty([1, 2, 3, 4, 5, 1]);
    expect(() => new ImmutableSet(inputArray)).toThrow(
      'Duplicate values found: 1',
    );
  });

  test('has method returns true for existing values', () => {
    const inputArray = requireArrayNonEmpty([1, 2, 3, 4, 5]);
    const immutableSet = new ImmutableSet(inputArray);
    expect(immutableSet.has(3)).toBe(true);
  });

  test('has method returns false for non-existing values', () => {
    const inputArray = requireArrayNonEmpty([1, 2, 3, 4, 5]);
    const immutableSet = new ImmutableSet(inputArray);
    expect(immutableSet.has(6)).toBe(false);
  });

  test('size method returns the correct size', () => {
    const inputArray = requireArrayNonEmpty([1, 2, 3, 4, 5]);
    const immutableSet = new ImmutableSet(inputArray);
    expect(immutableSet.size()).toBe(5);
  });

  test('values method returns an iterable with the correct values', () => {
    const inputArray = requireArrayNonEmpty([1, 2, 3, 4, 5]);
    const immutableSet = new ImmutableSet(inputArray);
    const values = Array.from(immutableSet.values());
    expect(values).toEqual(inputArray);
  });

  test('for..of loop iterates over the correct values', () => {
    const inputArray = requireArrayNonEmpty([1, 2, 3, 4, 5]);
    const immutableSet = new ImmutableSet(inputArray);
    const values: number[] = [];
    for (const value of immutableSet) {
      values.push(value);
    }
    expect(values).toEqual(inputArray);
  });

  test('forEach iterates over the set and executes the callback', () => {
    const inputArray = requireArrayNonEmpty([1, 2, 3, 4, 5]);
    const immutableSet = new ImmutableSet(inputArray);

    let sum = 0;
    immutableSet.forEach((value) => {
      sum += value;
    });

    expect(sum).toBe(15); // The sum of the inputArray elements
  });

  test('forEach uses the provided thisArg', () => {
    const inputArray = requireArrayNonEmpty(['a', 'b', 'c']);
    const immutableSet = new ImmutableSet(inputArray);

    const thisArg = { prefix: 'test_' };
    const result: string[] = [];

    const callback = function (this: typeof thisArg, value: string): void {
      result.push(this.prefix + value);
    };

    immutableSet.forEach(callback, thisArg);

    expect(result).toEqual(['test_a', 'test_b', 'test_c']);
  });
});
