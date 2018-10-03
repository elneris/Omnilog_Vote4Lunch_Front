import {combineReducers} from 'redux';

import todayslunchsReducer from './todayslunchs'
import fetchUpVoteReducer from './votes'

export default combineReducers({
  todayslunchs: todayslunchsReducer,
  upvote: fetchUpVoteReducer,

});