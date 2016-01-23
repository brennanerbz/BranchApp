import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';

import auth from './auth';
import branches from './branches';
import feeds from './feeds';
import messages from './messages';

// Keep in alphabetical order
export default combineReducers({
  router: routerStateReducer,
  auth,
  branches,
  feeds,
  messages
});
