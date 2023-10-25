/**
 * @author Dmitry Malakhov
 */

import React from 'react';
import PropTypes from 'prop-types';
import NameStyled from './styled/NameStyled';
import ScoreStyled from './styled/ScoreStyled';
import UserInfoStyled from './styled/UserInfoStyled';
import { parseFloatRound2 } from '../../../../utils/misc';

interface UserInfoProps {
  name: string;
  score: number;
  active: boolean;
}

const UserInfo: React.FC<UserInfoProps> = ({ name, score, active }) => (
  <UserInfoStyled active={active}>
    <NameStyled>
      {name}
    </NameStyled>
    <ScoreStyled>
      {parseFloatRound2(score)}
    </ScoreStyled>
  </UserInfoStyled>
);

UserInfo.propTypes = {
  name: PropTypes.string,
  score: PropTypes.number,
  active: PropTypes.bool,
};

UserInfo.defaultProps = {
  name: '',
  score: 0,
  active: false,
};

UserInfo.displayName = 'UserInfo';

export default UserInfo;
