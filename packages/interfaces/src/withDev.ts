export type WithDev<T> = {
  [K in keyof T]: T[K];
} & { dev: boolean };
