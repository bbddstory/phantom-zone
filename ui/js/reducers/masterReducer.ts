'use strict';

import { combineReducers } from 'redux';
import { localeReducer } from './localeReducer';
import { loginReducer } from './loginReducer';
import { dataReducer } from './dataReducer';
import { detailsReducer } from './detailsReducer';
import { uiReducer } from './uiReducer';

export default combineReducers({
  localeReducer,
  loginReducer,
  dataReducer,
  detailsReducer,
  uiReducer
});