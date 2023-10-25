/**
 * @author Dmitry Malakhov
 */

import React, { PureComponent, RefObject } from 'react';
import PropTypes from 'prop-types';
import { SCTransitionStyled } from './styled/SCTransitionStyled';
import { noop } from '../../../utils/misc';

interface Props {
  transitionIn: boolean;
  transitionOut: boolean;
  onTransitionIn: () => void;
  onTransitionOut: () => void;
}

export default class SCTransition extends PureComponent<Props> {
  private _domNode: HTMLElement | null = null;

  componentDidMount() {
    if (this._domNode) {
      this._domNode.addEventListener('transitionend', this._handleTransitionEnd);
      this._domNode.addEventListener('animationend', this._handleTransitionEnd);
    }
  }

  componentWillUnmount() {
    if (this._domNode) {
      this._domNode.removeEventListener('transitionend', this._handleTransitionEnd);
      this._domNode.removeEventListener('animationend', this._handleTransitionEnd);
    }
  }

  private _handleTransitionEnd = () => {
    const { transitionIn, transitionOut } = this.props;

    if (transitionIn) {
      this.props.onTransitionIn();
    }

    if (transitionOut) {
      this.props.onTransitionOut();
    }
  }

  private _saveRef = (ref: HTMLElement | null): void => {
    this._domNode = ref;
  }

  render() {
    const { transitionIn, transitionOut, children } = this.props;

    return (
      <SCTransitionStyled
        innerRef={this._saveRef}
        transitionIn={transitionIn}
        transitionOut={transitionOut}
      >
        {children}
      </SCTransitionStyled>
    );
  }
}

SCTransition.propTypes = {
  transitionIn: PropTypes.bool,
  transitionOut: PropTypes.bool,
  onTransitionIn: PropTypes.func,
  onTransitionOut: PropTypes.func,
};

SCTransition.defaultProps = {
  transitionIn: false,
  transitionOut: false,
  onTransitionIn: noop,
  onTransitionOut: noop,
};

SCTransition.displayName = 'SCTransition';
