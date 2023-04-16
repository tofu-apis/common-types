type Split<S extends string, D extends string> = string extends S
  ? string[]
  : S extends ''
  ? string[]
  : S extends `${infer T}${D}${infer U}`
  ? [T, ...Split<U, D>]
  : [S];

export default Split;
