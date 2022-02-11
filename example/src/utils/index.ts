export const padStart = (num: number): string =>
  num < 10 ? `0${num}` : `${num}`;
