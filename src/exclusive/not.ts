type Not<T, DisallowedT> = T extends DisallowedT ? never : T;

export default Not;
