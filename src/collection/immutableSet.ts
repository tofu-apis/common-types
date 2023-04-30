import { NonEmptyArray } from '../exclusive';

export class ImmutableSet<T> {
  private readonly _innerSet: Set<T>;

  constructor(inputArray: NonEmptyArray<T>) {
    const duplicates = this.findDuplicates(inputArray);
    if (duplicates.length > 0) {
      throw new Error(`Duplicate values found: ${duplicates.join(', ')}`);
    }
    this._innerSet = new Set(inputArray);
  }

  private findDuplicates(inputArray: T[]): T[] {
    const seen = new Set<T>();
    const duplicates = new Set<T>();

    inputArray.forEach((item) => {
      if (seen.has(item)) {
        duplicates.add(item);
      } else {
        seen.add(item);
      }
    });

    return Array.from(duplicates);
  }

  public has(value: T): boolean {
    return this._innerSet.has(value);
  }

  public size(): number {
    return this._innerSet.size;
  }

  public values(): IterableIterator<T> {
    return this._innerSet.values();
  }

  // Optional: you can add a custom iterator to make it easier to use
  // ImmutableUniqueSet with for..of loops
  *[Symbol.iterator](): IterableIterator<T> {
    yield* this._innerSet.values();
  }
}
