/**
 * @author Dmitry Malakhov
 */

import React from 'react';
import styled from 'styled-components';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { injectGlobalStyle } from './styles/globalStyles';
import ShallowRoute from './routes/ShallowRoute';

injectGlobalStyle();

const HeaderTitle = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const Root: React.FC = () => (
  <BrowserRouter>
    <div>
      <HeaderTitle>
        Noughts and Daggers Game
        <Link to="/about">More about project</Link>
      </HeaderTitle>
      <Route component={ShallowRoute} />
    </div>
  </BrowserRouter>
);

Root.displayName = 'Root';

export default Root;
