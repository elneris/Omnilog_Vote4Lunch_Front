import {combineReducers} from 'redux';

import todayslunchsReducer from './todayslunchs'
import fetchUpVoteReducer from './votes'
import fetchListOfRestaurantsReducer from './listOfRestaurants'
import createAVoteReducer from './createAVote'
import voteDataReducer from './voteData'

export default combineReducers({
  todayslunchs: todayslunchsReducer,
  upvote: fetchUpVoteReducer,
  restaurants: fetchListOfRestaurantsReducer,
  vote: createAVoteReducer,
  voteData: voteDataReducer
});