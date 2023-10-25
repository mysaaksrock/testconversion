/**
 * @author Dmitry Malakhov
 */

import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { List } from 'immutable';

const Score: List<number> = List([0, 0]);

export const ScorePropTypes: ImmutablePropTypes.List<number> = ImmutablePropTypes.listOf(PropTypes.number);
export const ScoreDefaultProps: List<number> = Score;

export default Score;