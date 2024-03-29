// types.ts
export interface NestedObject {
  [key: string]: NestedObject | string | NestedObject[] | undefined;
}

// https://stackoverflow.com/a/71442049
type BreakDownObject<O, R = void> = {
  [K in keyof O as string]: K extends string
    ? R extends string
      ? ObjectDotNotation<O[K], `${R}.${K}`>
      : ObjectDotNotation<O[K], K>
    : never;
};
export type ObjectDotNotation<O, R = void> = O extends string
  ? R extends string
    ? R
    : never
  : BreakDownObject<O, R>[keyof BreakDownObject<O, R>];
