/**
 * @author Dmitry Malakhov
 */

import React, { ReactNode } from 'react';
import RowStyled from './styled/RowStyled';

interface RowProps {
  children: ReactNode;
}

const Row = (props: RowProps): JSX.Element => (
  <RowStyled>
    {props.children}
  </RowStyled>
);

export default Row;