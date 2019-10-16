import axios from 'axios';

export const getAllVoicesForAVoteBegin = () => ({
  type: 'GET_ALL_VOICES_FOR_VOTES_BEGIN',
});

export const getAllVoicesForAVoteSuccess = result => ({
  type: 'GET_ALL_VOICES_FOR_VOTES_SUCCESS',
  result,
});

export const getAllVoicesForAVoteFailure = error => ({
  type: 'GET_ALL_VOICES_FOR_VOTES_FAILURE',
  error,
});

export function getAllVoicesForAVote(voteUrl) {
  return (dispatch) => {
    dispatch(getAllVoicesForAVoteBegin());
    return (
      axios({
        url: `http://localhost/api/voices/get/all?vote_url=${voteUrl}`,
        method: 'get',
        data: {
          vote_url: voteUrl,
        }
      })
        .then((result) => {
          dispatch(getAllVoicesForAVoteSuccess(result.data));
        })
        .catch(error => dispatch(getAllVoicesForAVoteFailure(error)))
    );
  };
}
