import {combineReducers} from 'redux';

import fetchUpVoteReducer from './votes'
import fetchListOfRestaurantsReducer from './listOfRestaurants'
import createAVoteReducer from './createAVote'
import voteDataReducer from './voteData'
import OnMapAlertReducer from './onMapAlert';

export default combineReducers({
  upvote: fetchUpVoteReducer,
  restaurants: fetchListOfRestaurantsReducer,
  vote: createAVoteReducer,
  voteData: voteDataReducer,
  onMapAlert: OnMapAlertReducer
});