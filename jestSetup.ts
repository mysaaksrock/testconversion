/* eslint-env jest */
/* eslint-disable no-console */

const throwError = jest.fn(
  (mes: string): void => {
    throw new Error(mes);
  },
);

console.error = throwError;
console.warn = throwError;