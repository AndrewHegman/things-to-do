// Credit -- https://spin.atomicobject.com/2020/09/09/type-safe-redux-typescript/
export type ValueOf<T> = T[keyof T];

export type ActionType<TActions extends { [k: string]: any }> = ReturnType<ValueOf<TActions>>;
