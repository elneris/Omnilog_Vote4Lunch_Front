const upVote = (state = '', action) => {
    switch (action.type) {
        case 'FETCH_UP_VOTE':

            fetch(`/api/lunch/up_vote/${action.id}`)

            return [...state, {completed: true}]

        default:
            return state;
    }
}

export default upVote;