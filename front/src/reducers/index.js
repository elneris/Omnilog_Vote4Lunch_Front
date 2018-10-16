import {combineReducers} from 'redux';

import fetchListOfRestaurantsReducer from './listOfRestaurants'
import createAVoteReducer from './createAVote'
import voteDataReducer from './voteData'
import OnMapAlertReducer from './onMapAlert';
import topAlertReducer from './topAlert'
import getPlacesListReducer from './getPlacesList'
import getVoicesCountReducer from './getVoicesCount'
import addVoiceReducer from './addVoice'
import getUsersVotesReducer from './getUsersVotes'
import getManyPlacesListReducer from './getManyPlacesList'
import verifyIfUserHasVotedReducer from './verifyIfUserHasVoted';
import userDataReducer from './userData';

export default combineReducers({
  restaurants: fetchListOfRestaurantsReducer,
  vote: createAVoteReducer,
  voteData: voteDataReducer,
  onMapAlert: OnMapAlertReducer,
  topAlert: topAlertReducer,
  getPlacesList: getPlacesListReducer,
  getVoicesCount: getVoicesCountReducer,
  addVoice: addVoiceReducer,
  usersVotes: getUsersVotesReducer,
  getManyPlacesList: getManyPlacesListReducer,
  verifyIfUserHasVoted: verifyIfUserHasVotedReducer,
  userData: userDataReducer,
});