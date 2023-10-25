import { List } from 'immutable';

export const checkRow = (playingboard: List<List<number>>, rowNum: number, amountCellsToWin: number): boolean => {
  const size: number = playingboard.size;
  let result: number = 0;

  for (let columnNum: number = 0; columnNum < size; columnNum++) {
    const nextValue: number | undefined = playingboard.getIn([rowNum, columnNum]);

    if (nextValue)
      result += nextValue;
    else
      result = 0;

    if (Math.abs(result) === amountCellsToWin)
      return true;
  }

  return false;
};

export const checkColumn = (playingboard: List<List<number>>, columnNum: number, amountCellsToWin: number): boolean => {
  const size: number = playingboard.size;
  let result: number = 0;

  for (let rowNum: number = 0; rowNum < size; rowNum++) {
    const nextValue: number | undefined = playingboard.getIn([rowNum, columnNum]);

    if (nextValue)
      result += nextValue;
    else
      result = 0;

    if (Math.abs(result) === amountCellsToWin)
      return true;
  }

  return false;
};

const checkMainDiagonal = (
  playingboard: List<List<number>>,
  amountCellsToWin: number,
  lastRowNum: number,
  lastColumnNum: number,
): boolean => {
  const size: number = playingboard.size;
  let result: number = 1;

  const mustBeValue: number | undefined = playingboard.getIn([lastRowNum, lastColumnNum]);

  let index: number = 1,
    neededNext: boolean = true;

  while (
    lastRowNum - index >= 0 &&
    lastColumnNum + index <= size &&
    neededNext
  ) {
    const nextRowNum: number = lastRowNum - index;
    const nextColumnNum: number = lastColumnNum + index;
    const nextCellValue: number | undefined = playingboard.getIn([nextRowNum, nextColumnNum]);

    neededNext = nextCellValue && nextCellValue === mustBeValue;

    if (neededNext) {
      index++;
      result++;

      if (result === amountCellsToWin)
        return true;
    }
  }

  index = 1;
  neededNext = true;

  while (
    lastRowNum + index <= size &&
    lastColumnNum - index >= 0 &&
    neededNext
  ) {
    const nextRowNum: number = lastRowNum + index;
    const nextColumnNum: number = lastColumnNum - index;
    const nextCellValue: number | undefined = playingboard.getIn([nextRowNum, nextColumnNum]);

    neededNext = nextCellValue && nextCellValue === mustBeValue;

    if (neededNext) {
      index++;
      result++;

      if (result === amountCellsToWin)
        return true;
    }
  }

  return false;
};

const checkAntidiagonal = (
  playingboard: List<List<number>>,
  amountCellsToWin: number,
  lastRowNum: number,
  lastColumnNum: number,
): boolean => {
  const size: number = playingboard.size;
  let result: number = 1;

  const mustBeValue: number | undefined = playingboard.getIn([lastRowNum, lastColumnNum]);

  let index: number = 1,
    neededNext: boolean = true;

  while (
    lastRowNum - index >= 0 &&
    lastColumnNum - index >= 0 &&
    neededNext
  ) {
    const nextRowNum: number = lastRowNum - index;
    const nextColumnNum: number = lastColumnNum - index;
    const nextCellValue: number | undefined = playingboard.getIn([nextRowNum, nextColumnNum]);

    neededNext = nextCellValue && nextCellValue === mustBeValue;

    if (neededNext) {
      index++;
      result++;

      if (result === amountCellsToWin)
        return true;
    }
  }

  index = 1;
  neededNext = true;

  while (
    lastRowNum + index <= size &&
    lastColumnNum + index <= size &&
    neededNext
  ) {
    const nextRowNum: number = lastRowNum + index;
    const nextColumnNum: number = lastColumnNum + index;
    const nextCellValue: number | undefined = playingboard.getIn([nextRowNum, nextColumnNum]);

    neededNext = nextCellValue && nextCellValue === mustBeValue;

    if (neededNext) {
      index++;
      result++;

      if (result === amountCellsToWin)
        return true;
    }
  }

  return false;
};

export const checkDiagonals = (
  playingboard: List<List<number>>,
  lastRowNum: number,
  lastColumnNum: number,
  amountCellsToWin: number,
): boolean => {
  const mainDiagonalIsComplete: boolean = checkMainDiagonal(
    playingboard,
    amountCellsToWin,
    lastRowNum,
    lastColumnNum,
  );

  const antidiagonalIsComplete: boolean = checkAntidiagonal(
    playingboard,
    amountCellsToWin,
    lastRowNum,
    lastColumnNum,
  );

  return mainDiagonalIsComplete || antidiagonalIsComplete;
};

export const countInitScores = (size: number, players: List<any>, amountCellsToWin: number): List<number> => List(
  Array.from(
    { length: players.size },
    () => size * amountCellsToWin,
  )
);

export const countCostOfMove = (size: number, players: List<any>, score: List<number>): List<number> =>
  score.map(score => score / ((size * size) / 2));

export const recalculateScore = (score: List<number>, costOfMove: List<number>, currentPlayer: number): List<number> =>
  score.update(
    currentPlayer,
    value => value - costOfMove.get(currentPlayer),
  );