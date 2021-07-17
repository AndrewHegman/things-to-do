const slowMode = false;
const slowModeTime = 2000;

export const resolveSlowPromiseWrapper = <T>(resData: T) => {
  return new Promise<T>((res) => setTimeout(() => res(resData), slowMode ? slowModeTime : 0));
};

export const rejectSlowPromiseWrapper = <T>(resData: T) => {
  return new Promise<T>((res, rej) => setTimeout(() => rej(resData), slowMode ? slowModeTime : 0));
};
