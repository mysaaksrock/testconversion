/**
 * @author Dmitry Malakhov
 */

'use strict';

export const noop = (): void => {};
export const isUndef = (maybeUndef: any): boolean => typeof maybeUndef === 'undefined';
export const fastParseNumberFromString = (string: string): number => parseInt(string, 10);

export const isNumeric = (maybeNumeric: any): boolean =>
  !isNaN(parseFloat(maybeNumeric)) && isFinite(maybeNumeric);

export const parseFloatRound2 = (number: number): number => Math.round(number * 100) / 100;
