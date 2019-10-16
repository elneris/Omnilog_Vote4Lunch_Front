import axios from 'axios';


export const deleteAVoteBegin = () => ({
  type: 'DELETE_A_VOTE_BEGIN',
});

export const deleteAVoteSuccess = result => ({
  type: 'DELETE_A_VOTE_SUCCESS',
  result,
});

export const deleteAVoteFailure = error => ({
  type: 'DELETE_A_VOTE_FAILURE',
  error,
});

export const deleteAVoteInit = () => ({
  type: 'DELETE_A_VOTE_INIT',
});

export function deleteAVote(voteUrl) {
  const token = localStorage.getItem('token');
  return (dispatch) => {
    dispatch(deleteAVoteBegin());
    return (
      axios({
        url: 'http://localhost/api/votes/delete',
        headers: { Authorization: `Bearer ${token}` },
        method: 'delete',
        data: {
          vote_url: voteUrl,
        }
      })
        .then(result => dispatch(deleteAVoteSuccess(result.data)))
        .then(() => dispatch(deleteAVoteInit()))
        .catch(error => dispatch(deleteAVoteFailure(error)))
    );
  };
}
