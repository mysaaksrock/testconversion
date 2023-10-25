/**
 * @author Dmitry Malakhov
 */

import { List } from 'immutable';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { DEFAULT_SIZE_PLAYINGBOARD } from '../constants/game';

const matrixGeneratorConfig = (size: number): { length: number } => ({ length: size });

export const initialMatrix = (size: number): number[][] => Array.from(
  matrixGeneratorConfig(size),
  () => List(Array.from(matrixGeneratorConfig(size), () => 0)),
);

const Playingboard: List<List<number>> = List(initialMatrix(DEFAULT_SIZE_PLAYINGBOARD));

export const PlayingboardPropTypes: ImmutablePropTypes.ListOf<
  ImmutablePropTypes.ListOf<number>
> = ImmutablePropTypes.listOf(
  ImmutablePropTypes.listOf(
    PropTypes.number,
  ),
);

export const PlayingboardDefaultProps: List<List<number>> = Playingboard;

export default Playingboard;
