/**
 * @author Dmitry Malakhov
 */

import styled, { CSSObject } from 'styled-components';

interface Props {
  active: boolean;
}

const background = ({ active }: Props): CSSObject => active
  ? { background: '#dddddd' }
  : {};

const StyledDiv = styled.div<Props>`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  ${background}
`;

export default StyledDiv;