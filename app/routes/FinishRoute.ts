/**
 * @author Dmitry Malakhov
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { restartGame } from '../actions/game';
import Button from '../components/Button';
import RouteContainer from '../containers/RouteContainer';
import FinishRouteContainer from '../containers/FinishRouteContainer';
import { PlayersPropTypes, PlayersDefaultProps } from '../models/players';
import { noop } from '../../utils/misc';

interface Props {
  players: PlayersPropTypes;
  currentPlayer: number;
  onRestartGame: () => void;
}

const defaultProps: Props = {
  players: PlayersDefaultProps,
  currentPlayer: 0,
  onRestartGame: noop,
};

class FinishRoute extends PureComponent<Props> {
  _handleClickRestartGame = (): void => {
    this.props.onRestartGame();
  }

  render(): JSX.Element {
    const { players, currentPlayer } = this.props;
    const playerName = players.getIn([currentPlayer, 'name']);

    return (
      <RouteContainer>
        <FinishRouteContainer>
          Win {playerName}
          <Button label="Restart game" onClick={this._handleClickRestartGame} />
        </FinishRouteContainer>
      </RouteContainer>
    );
  }
}

const mapStateToProps = ({ game }: { game: any }) => ({
  players: game.players,
  currentPlayer: game.currentPlayer,
});

const mapDispatchToProps = (dispatch: any) => ({
  onRestartGame: (): void => dispatch(restartGame()),
});

export default connect(mapStateToProps, mapDispatchToProps)(FinishRoute);