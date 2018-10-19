
const verifyIfUserHasVoted = (state = [], action) => {
  switch (action.type) {
    case 'VERIFY_IF_USER_HAS_VOTED_SUCCESS': {
      const newState = [...state];

      const condition = newState.some(e =>
        e.vote_id === action.result.vote_id
        && e.pseudo === action.result.pseudo
        && e.email === action.result.email
      );

      if (!condition) {
        newState.push(action.result);
      } else if (condition) {
        newState.map((e) => {
          if (e.vote_id === action.result.vote_id) {
            e.vote = action.result.vote;
          }
          return e;
        });
      }
      return newState;
    }

    default:
      return state;
  }
};

export default verifyIfUserHasVoted;
