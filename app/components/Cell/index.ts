/**
 * @author Dmitry Malakhov
 */

import React, { PureComponent, MouseEvent } from 'react';
import PropTypes from 'prop-types';
import CellStyled from './styled/CellStyled';
import { noop } from '../../../utils/misc';

interface Props {
  column: number;
  row: number;
  mode: number;
  onClick: (row: number, column: number) => void;
}

class Cell extends PureComponent<Props> {
  handleClick = () => {
    const { column, row } = this.props;
    this.props.onClick(row, column);
  }

  renderContent() {
    const { mode } = this.props;

    if (mode === 1)
      return 'o';

    if (mode === -1)
      return 'x';

    return null;
  }

  render() {
    const content = this.renderContent();

    return (
      <CellStyled onClick={this.handleClick}>
        {content}
      </CellStyled>
    );
  }
}

Cell.propTypes = {
  column: PropTypes.number,
  row: PropTypes.number,
  mode: PropTypes.number,
  onClick: PropTypes.func,
};

Cell.defaultProps = {
  column: 0,
  row: 0,
  mode: 0,
  onClick: noop,
};

export default Cell;