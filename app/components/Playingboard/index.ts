/**
 * @author Dmitry Malakhov
 */

import React, { Component, ReactNode } from 'react';
import PropTypes from 'prop-types';
import Cell from '../Cell';
import Row from '../Row';
import PlayingboardStyled from './styled/PlayingboardStyled';

import {
  PlayingboardPropTypes,
  PlayingboardDefaultProps,
} from '../../models/playingboard';

import { noop } from '../../../utils/misc';

interface Props {
  playingboard: PlayingboardPropTypes;
  onChangeCellMode: (rowNum: number, cellNum: number) => void;
}

class Playingboard extends Component<Props> {
  static propTypes = {
    playingboard: PlayingboardPropTypes,
    onChangeCellMode: PropTypes.func,
  };

  static defaultProps = {
    playingboard: PlayingboardDefaultProps,
    onChangeCellMode: noop,
  };

  shouldComponentUpdate(nextProps: Props): boolean {
    if (nextProps.playingboard !== this.props.playingboard)
      return true;

    return false;
  }

  private handleChangeModeCell = (rowNum: number, cellNum: number): void => {
    this.props.onChangeCellMode(rowNum, cellNum);
  }

  private renderRows(): ReactNode {
    const { playingboard } = this.props;

    return Array.from({ length: playingboard.size }, (value, rowNum) => {
      const cells = Array.from(
        { length: playingboard.size },
        (value, cellNum) => (
          <Cell
            key={cellNum}
            column={cellNum}
            row={rowNum}
            mode={playingboard.getIn([rowNum, cellNum])}
            onClick={this.handleChangeModeCell}
          />
        ),
      );

      return (
        <Row key={rowNum}>
          {cells}
        </Row>
      );
    });
  }

  render(): ReactNode {
    const rows = this.renderRows();

    return (
      <PlayingboardStyled>
        {rows}
      </PlayingboardStyled>
    );
  }
}

export default Playingboard;