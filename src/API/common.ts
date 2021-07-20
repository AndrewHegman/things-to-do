export const resolveSlowPromiseWrapper = <T>(resData: T, slowMode: boolean, slowModeTime: number) => {
  return new Promise<T>((res) => setTimeout(() => res(resData), slowMode ? slowModeTime : 0));
};

export const rejectSlowPromiseWrapper = <T>(resData: T, slowMode: boolean, slowModeTime: number) => {
  return new Promise<T>((res, rej) => setTimeout(() => rej(resData), slowMode ? slowModeTime : 0));
};
