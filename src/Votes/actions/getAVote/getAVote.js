import axios from 'axios';

export const getAVoteBegin = () => ({
  type: 'GET_A_VOTE_BEGIN',
});

export const getAVoteSuccess = result => ({
  type: 'GET_A_VOTE_SUCCESS',
  result,
});

export const getAVoteFailure = error => ({
  type: 'GET_A_VOTE_FAILURE',
  error,
});

export function getAVote(voteUrl) {
  return (dispatch) => {
    dispatch(getAVoteBegin());
    return (
      axios
        .get(`http://localhost/api/votes?url=${voteUrl}`)
        .then((vote) => {
          dispatch(getAVoteSuccess(vote.data['hydra:member'][0]));
        })
        .catch(error => dispatch(getAVoteFailure(error)))
    );
  };
}
