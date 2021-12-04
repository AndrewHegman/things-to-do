export const resolveSlowPromiseWrapper = <T>(resData: T, slowModeTime: number) => {
  return new Promise((res, rej) => setTimeout(() => res({ json: () => Promise.resolve(resData), ok: true } as Response), slowModeTime));
};

export const rejectSlowPromiseWrapper = (resData: string, slowModeTime: number) => {
  return new Promise((res, rej) => setTimeout(() => res({ ok: false, json: () => Promise.resolve({}), statusText: resData } as Response)));
};
