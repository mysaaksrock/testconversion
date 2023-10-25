/**
 * @author Dmitry Malakhov
 */

'use strict';

import { createReducer } from 'redux-act';
import { redirectToPath } from '../actions/app';
import { ROOT_ROUTE } from '../constants/route';

interface State {
  routeName: string;
}

const initialState: State = {
  routeName: ROOT_ROUTE,
};

export default createReducer<State>({
  [redirectToPath]: (state, payload) => ({ ...state, routeName: payload }),
}, initialState);