import {combineReducers} from 'redux';

import todayslunchsReducer from './todayslunchs'
import fetchUpVoteReducer from './votes'
import fetchListOfRestaurantsReducer from './listOfRestaurants'
import createAVoteReducer from './createAVote'

export default combineReducers({
  todayslunchs: todayslunchsReducer,
  upvote: fetchUpVoteReducer,
  restaurants: fetchListOfRestaurantsReducer,
  vote: createAVoteReducer
});