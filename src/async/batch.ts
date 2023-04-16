import Result from '../result';

export async function promisesByKey<KEY_TYPE extends string, RESULT_TYPE>(
  keys: Set<KEY_TYPE>,
  promiseFunction: (key: KEY_TYPE) => Promise<Result<RESULT_TYPE, Error>>,
): Promise<Record<KEY_TYPE, Result<RESULT_TYPE, Error>>> {
  const keysArray: KEY_TYPE[] = Array.from(keys);
  const promiseArray = await Promise.allSettled<Result<RESULT_TYPE, Error>>(
    keysArray.map((key) => promiseFunction(key)),
  );

  if (keysArray.length !== promiseArray.length) {
    throw new Error(
      `Failed to create promises equivalent to the number of keys ${keysArray.length}; only created ${promiseArray.length}`,
    );
  }

  const promisesByKey: Record<
    KEY_TYPE,
    Result<RESULT_TYPE, Error>
  > = {} as Record<KEY_TYPE, Result<RESULT_TYPE, Error>>;
  for (let i = 0; i < keysArray.length; i++) {
    const currentPromiseResult: PromiseSettledResult<
      Result<RESULT_TYPE, Error>
    > = promiseArray[i];
    const currentKey: KEY_TYPE = keysArray[i];

    if (currentPromiseResult.status === 'rejected') {
      promisesByKey[currentKey] = Result.err(
        new Error(currentPromiseResult.reason),
      );
    } else {
      promisesByKey[currentKey] = currentPromiseResult.value;
    }
  }
  return promisesByKey;
}

export async function promisesByOrder<RESULT_TYPE>(
  promises: Promise<Result<RESULT_TYPE, Error>>[],
): Promise<Result<RESULT_TYPE, Error>[]> {
  const promiseArray = await Promise.allSettled<Result<RESULT_TYPE, Error>>(
    promises,
  );

  if (promises.length !== promiseArray.length) {
    throw new Error(
      `Failed to create promises equivalent to the number of input promises ${promises.length}; only created ${promiseArray.length}`,
    );
  }

  return promiseArray.map((promiseResult) => {
    if (promiseResult.status === 'rejected') {
      return Result.err(new Error(promiseResult.reason));
    } else {
      return promiseResult.value;
    }
  });
}
