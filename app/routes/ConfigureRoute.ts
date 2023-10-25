/**
 * @author Dmitry Malakhov
 */

import React, { PureComponent, ChangeEvent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List } from 'immutable';
import { configureGame } from '../actions/game';
import Button from '../components/Button';
import Input from '../components/Input';
import RouteContainer from '../containers/RouteContainer';
import ConfigureRouteContainer from '../containers/ConfigureRouteContainer';
import { DEFAULT_SIZE_PLAYINGBOARD } from '../constants/game';

import {
  Player,
  PlayersPropTypes,
  PlayersDefaultProps,
} from '../models/players';

import { noop, isNumeric, fastParseNumberFromString } from '../../utils/misc';

interface Props {
  players: PlayersPropTypes;
  size: number;
  amountCellsToWin: number;
  onConfigureGame: (size: number, players: List<Player>, amountCellsToWin: number) => void;
}

interface State {
  playerName1: string;
  playerName2: string;
  amountCellsToWin: number;
  size: number;
}

const defaultProps: Props = {
  players: PlayersDefaultProps,
  size: DEFAULT_SIZE_PLAYINGBOARD,
  amountCellsToWin: DEFAULT_SIZE_PLAYINGBOARD,
  onConfigureGame: noop,
};

class ConfigureRoute extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      playerName1: props.players.getIn([0, 'name']),
      playerName2: props.players.getIn([1, 'name']),
      amountCellsToWin: props.amountCellsToWin,
      size: props.size,
    };
  }

  private handleClickStartGame = (): void => {
    const { size, playerName1, playerName2, amountCellsToWin } = this.state;

    const players = List.of(
      new Player({ name: playerName1 }),
      new Player({ name: playerName2 }),
    );

    this.props.onConfigureGame(size, players, amountCellsToWin);
  }

  private handleChangePlayerName1 = (event: ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      playerName1: event.target.value,
    });
  }

  private handleChangePlayerName2 = (event: ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      playerName2: event.target.value,
    });
  }

  private handleChangeSize = (event: ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;
    if (isNumeric(value) || !value) {
      this.setState({
        size: fastParseNumberFromString(value) || value,
      });
    }
  }

  private handleChangeAmountCellToWin = (event: ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;
    if (isNumeric(value) || !value) {
      this.setState({
        amountCellsToWin: fastParseNumberFromString(value) || value,
      });
    }
  }

  render() {
    return (
      <RouteContainer>
        <ConfigureRouteContainer>
          <Input
            label="Player #1"
            placeholder="Name"
            value={this.state.playerName1}
            onChange={this.handleChangePlayerName1}
          />
          <Input
            label="Player #2"
            placeholder="Name"
            value={this.state.playerName2}
            onChange={this.handleChangePlayerName2}
          />
          <Input
            label="Size"
            placeholder="Default size: 3"
            value={this.state.size}
            onChange={this.handleChangeSize}
          />
          <Input
            label="Cells to win"
            placeholder="Default cells to win: 3"
            value={this.state.amountCellsToWin}
            onChange={this.handleChangeAmountCellToWin}
          />
          <Button
            label="To start the battle!"
            onClick={this.handleClickStartGame}
          />
        </ConfigureRouteContainer>
      </RouteContainer>
    );
  }
}

ConfigureRoute.defaultProps = defaultProps;
ConfigureRoute.displayName = 'ConfigureRoute';

const mapStateToProps = ({ game: { players, amountCellsToWin, size } }) => ({
  players,
  amountCellsToWin,
  size,
});

const mapDispatchToProps = dispatch => ({
  onConfigureGame: (size, players, amountCellsToWin) =>
    void dispatch(configureGame(size, players, amountCellsToWin)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConfigureRoute);
