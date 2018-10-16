const usersVotes = (state = [], action) => {
    switch (action.type) {
        case 'GET_USERS_VOTES_SUCCESS':
            const newState = [...action.votes]
            return [...newState]
        default:
            return state;
    }
}

export default usersVotes;