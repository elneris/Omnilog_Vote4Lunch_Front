import axios from 'axios'
  
export const verifyIfUserHasVotedSuccess = result => ({
    type: 'VERIFY_IF_USER_HAS_VOTED_SUCCESS',
    result,
});
  
  export function verifyIfUserHasVoted(vote_id,pseudo,email) {
    return (dispatch) => {
      return (
        axios
            .get(`/api/voice/count/foruser?vote_id=${vote_id}&pseudo=${pseudo}&email=${email}`)
            .then(result => result.data)
            .then(result => {
                dispatch(verifyIfUserHasVotedSuccess(result))
            })
    );
     
    };
  }