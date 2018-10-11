import {combineReducers} from 'redux';

import fetchListOfRestaurantsReducer from './listOfRestaurants'
import createAVoteReducer from './createAVote'
import voteDataReducer from './voteData'
import OnMapAlertReducer from './onMapAlert';
import getPlacesListReducer from './getPlacesList'
import getVoicesCountReducer from './getVoicesCount'
import addVoiceReducer from './addVoice'
import getUsersVotesReducer from './getUsersVotes'

export default combineReducers({
  restaurants: fetchListOfRestaurantsReducer,
  vote: createAVoteReducer,
  voteData: voteDataReducer,
  onMapAlert: OnMapAlertReducer,
  getPlacesList: getPlacesListReducer,
  getVoicesCount: getVoicesCountReducer,
  addVoice: addVoiceReducer,
  usersVotes: getUsersVotesReducer,
});