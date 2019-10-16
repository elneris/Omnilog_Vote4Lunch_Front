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

export function getUserVoices(pseudo, email, votesUrl) {
  return (dispatch) => {
    dispatch(getUserVoicesBegin());
    return (
      axios
        .get(`http://localhost/api/voices/get/all/for_user?pseudo=${pseudo}&email=${email}&votes_url=${votesUrl}`)
        .then(voices => dispatch(getUserVoicesSuccess(voices.data)))
        .catch(error => dispatch(getUserVoicesFailure(error)))
    );
  };
}
