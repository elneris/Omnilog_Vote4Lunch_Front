import axios from 'axios';

export const verifyIfUserHasVotedSuccess = result => ({
  type: 'VERIFY_IF_USER_HAS_VOTED_SUCCESS',
  result,
});

export function verifyIfUserHasVoted(voteId, pseudo, email) {
  return dispatch => (
    axios
      .get(`/api/voice/count/foruser?vote_id=${voteId}&pseudo=${pseudo}&email=${email}`)
      .then(result => result.data)
      .then((result) => {
        dispatch(verifyIfUserHasVotedSuccess(result));
      })
  );
}
