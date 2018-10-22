import axios from 'axios';

export const getUserVoicesBegin = () => ({
  type: 'GET_USER_VOICES_BEGIN',
});

export const getUserVoicesSuccess = result => ({
  type: 'GET_USER_VOICES_SUCCESS',
  result,
});

export const getUserVoicesFailure = error => ({
  type: 'GET_USER_VOICES_FAILURE',
  error,
});

export function getUserVoices(pseudo,email,voteUrl) {
  return (dispatch) => {
    dispatch(getUserVoicesBegin());
    return (
      axios
        .get(`/api/voice/get/foruser?pseudo=${pseudo}&email=${email}&vote_url=${voteUrl}`)
        .then((voices) => dispatch(getUserVoicesSuccess(voices.data)))
        .catch(error => dispatch(getUserVoicesFailure(error)))
    );
  };
}
