export type AsyncFunction<T = unknown> = (...args: unknown[]) => Promise<T>;

export type VoidFunction = () => void;

export type AsyncVoidFunction = () => Promise<void>;

export type Callback<T = void> = (value: T) => void;

export type ErrorCallback = (error: Error) => void;

export type SuccessCallback<T = void> = (result: T) => void;

export type Parameters<T extends (...args: never[]) => unknown> = T extends (
  ...args: infer P
) => unknown
  ? P
  : never;

export type ReturnType<T extends (...args: never[]) => unknown> = T extends (
  ...args: never[]
) => infer R
  ? R
  : never;

export type AwaitedReturnType<T extends (...args: never[]) => unknown> = Awaited<ReturnType<T>>;

export type Curry<F extends (...args: never[]) => unknown> = Parameters<F> extends [
  infer First,
  ...infer Rest,
]
  ? (arg: First) => Rest extends []
      ? ReturnType<F>
      : Curry<(...args: Rest) => ReturnType<F>>
  : ReturnType<F>;

export type Partial<F extends (...args: never[]) => unknown> = (
  ...args: Partial<Parameters<F>>
) => ReturnType<F>;

export type Debounced<T extends (...args: never[]) => unknown> = {
  (...args: Parameters<T>): void;
  cancel: () => void;
  flush: () => void;
};

export type Throttled<T extends (...args: never[]) => unknown> = {
  (...args: Parameters<T>): void;
  cancel: () => void;
};

export type Memoized<T extends (...args: never[]) => unknown> = {
  (...args: Parameters<T>): ReturnType<T>;
  cache: Map<string, ReturnType<T>>;
  clear: () => void;
};

export type Pipeline<T, R> = (input: T) => R;

export type Compose<T extends ((...args: never[]) => unknown)[]> = T extends [
  infer F extends (...args: never[]) => unknown,
  ...infer Rest extends ((...args: never[]) => unknown)[],
]
  ? (...args: Parameters<F>) => Rest extends []
      ? ReturnType<F>
      : Compose<Rest>
  : never;

