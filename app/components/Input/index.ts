/**
 * @author Dmitry Malakhov
 */

import React, { PureComponent, ChangeEvent } from 'react';
import PropTypes from 'prop-types';
import { LabelStyled } from './styled/LabelStyled';
import { InputStyled } from './styled/InputStyled';
import { noop } from '../../../utils/misc';

interface InputProps {
  label: string;
  placeholder: string;
  value: string | number;
  onChange: (value: string) => void;
}

const propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  onChange: PropTypes.func,
};

const defaultProps: InputProps = {
  label: '',
  placeholder: '',
  value: '',
  onChange: noop,
};

let nextInputId = 0;

export default class Input extends PureComponent<InputProps> {
  private _inputID = `input-${nextInputId++}`;

  private _handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event) return;
    this.props.onChange(event.target.value);
  }

  render() {
    return (
      <LabelStyled htmlFor={this._inputID}>
        {this.props.label}
        <InputStyled
          id={this._inputID}
          value={this.props.value}
          placeholder={this.props.placeholder}
          onChange={this._handleChange}
        />
      </LabelStyled>
    );
  }
}

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;
Input.displayName = 'Input';
