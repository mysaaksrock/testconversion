/**
 * @author Dmitry Malakhov
 */

import { List, Record } from 'immutable';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

export interface IPlayer {
  name: string;
}

export const Player = Record<IPlayer>({
  name: '',
});

const player1: Player = new Player({ name: 'Player 1' });
const player2: Player = new Player({ name: 'Player 2' });

const Players: List<Player> = List([player1, player2]);

export const PlayersDefaultProps: List<Player> = Players;

export const PlayersPropTypes = ImmutablePropTypes.listOf(
  ImmutablePropTypes.recordOf({
    name: PropTypes.string,
  }),
);

export default Players;
