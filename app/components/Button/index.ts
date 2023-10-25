/**
 * @author Dmitry Malakhov
 */

import React, { FC, MouseEvent } from 'react';
import PropTypes from 'prop-types';
import { ButtonStyled } from './styled/ButtonStyled';
import { noop } from '../../../utils/misc';

interface ButtonProps {
  label: string;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

const Button: FC<ButtonProps> = ({ label, onClick }) => (
  <ButtonStyled onClick={onClick}>
    {label}
  </ButtonStyled>
);

Button.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  label: '',
  onClick: noop,
};

Button.displayName = 'Button';

export default Button;
