import {combineReducers} from 'redux';

import todayslunchsReducer from './todayslunchs'

export default combineReducers({
  todayslunchs: todayslunchsReducer,

});