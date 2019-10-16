import axios from 'axios';
import { getVoiceCount, getUserVoices, getAllVoicesForAVote } from '..';

export const addVoiceBegin = () => ({
  type: 'ADD_VOICE_BEGIN',
});

export const addVoiceSuccess = result => ({
  type: 'ADD_VOICE_SUCCESS',
  result,
});

export const addVoiceFailure = error => ({
  type: 'ADD_VOICE_FAILURE',
  error,
});

export function addVoice(voteUrl, placeId) {
  const pseudo = localStorage.getItem('pseudo');
  const email = localStorage.getItem('email');
  return (dispatch) => {
    dispatch(addVoiceBegin());
    return (
      axios({
        url: 'http://localhost/api/voices/add',
        method: 'post',
        data: {
          vote_url: voteUrl,
          place_id: placeId,
          pseudo,
          email,
        }
      })
        .then((result) => {
          dispatch(addVoiceSuccess(result.data));
          dispatch(getVoiceCount(voteUrl, placeId));
          dispatch(getUserVoices(pseudo, email, [voteUrl]));
          dispatch(getAllVoicesForAVote(voteUrl));
        })
        .catch(error => dispatch(addVoiceFailure(error)))
    );
  };
}
