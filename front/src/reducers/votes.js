const upVote = (state = '', action) => {
    switch (action.type) {
        case 'FETCH_UP_VOTE':

            fetch(`/api/lunch/up_vote/${action.id}`)

            return {vote_id: action.id, completed: true}
        
        case 'FETCH_DOWN_VOTE':

            fetch(`/api/lunch/down_vote/${action.id}`)

            return {vote_id: action.id, completed: true}
        
        default:
            return state;
    }
}

export default upVote;