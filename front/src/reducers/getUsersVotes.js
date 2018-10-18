const usersVotes = (state = [], action) => {
  switch (action.type) {
    case 'GET_USERS_VOTES_SUCCESS':
      return [...action.votes];
    default:
      return state;
  }
};

export default usersVotes;
