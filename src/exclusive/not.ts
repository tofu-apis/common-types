export type Not<T, DisallowedT> = T extends DisallowedT ? never : T;
