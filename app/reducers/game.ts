/**
 * @author Dmitry Malakhov
 */

'use strict';

import { createReducer } from 'redux-act';
import { List } from 'immutable';

import {
  gameConfiguredComplete,
  toggleCellMode,
  togglePlayer,
  gameEnd,
  resetGameState,
  updateScore,
} from '../actions/game';

import {
  DEFAULT_SIZE_PLAYINGBOARD,
  GAME_CONFIGURE,
  GAME_RUN,
  GAME_END,
} from '../constants/game';

import Playingboard, { initialMatrix } from '../models/playingboard';
import Players from '../models/players';
import Score from '../models/score';

interface GameState {
  size: number;
  amountCellsToWin: number;
  players: any;
  playingboard: any;
  score: any;
  currentPlayer: number;
  moveAmount: number;
  status: string;
}

const initialState: GameState = {
  size: DEFAULT_SIZE_PLAYINGBOARD,
  amountCellsToWin: DEFAULT_SIZE_PLAYINGBOARD,
  players: Players,
  playingboard: Playingboard,
  score: Score,
  currentPlayer: 0,
  moveAmount: 0,
  status: GAME_CONFIGURE,
};

export default createReducer({
  [gameConfiguredComplete]: (state: GameState,
    {
      size,
      players,
      amountCellsToWin,
      score,
      costOfMove,
    }: any) => ({
    ...state,
    playingboard: List(initialMatrix(size)),
    players,
    score,
    amountCellsToWin,
    status: GAME_RUN,
    size,
    costOfMove,
  }),
  [toggleCellMode]: (state: GameState, { rowNum, cellNum }: any) => ({
    ...state,
    playingboard: state.playingboard.setIn(
      [rowNum, cellNum],
      state.currentPlayer === 1 ? 1 : -1,
    ),
    lastSelectedCell: [rowNum, cellNum],
    moveAmount: state.moveAmount + 1,
  }),
  [togglePlayer]: (state: GameState) => ({
    ...state,
    currentPlayer: state.currentPlayer ? 0 : 1,
  }),
  [gameEnd]: (state: GameState) => ({
    ...state,
    status: GAME_END,
  }),
  [resetGameState]: (state: GameState) => ({
    ...state,
    status: GAME_CONFIGURE,
    moveAmount: 0,
    playingboard: Playingboard,
  }),
  [updateScore]: (state: GameState, { score }: any) => ({
    ...state,
    score,
  }),
}, initialState);