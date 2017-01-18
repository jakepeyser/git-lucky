import { combineReducers } from 'redux';
import user from './user';
import following from './following';

export default combineReducers({
  user,
  following
});
