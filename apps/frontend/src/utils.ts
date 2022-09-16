export const removeFromArray = (arr: any[], idx: number) => {
  return [...arr.slice(0, idx), ...arr.slice(idx + 1)];
};
