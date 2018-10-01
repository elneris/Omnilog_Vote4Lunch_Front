import {combineReducers} from 'redux';
import oneReducer from './one';


export default combineReducers({
  one: oneReducer,
});