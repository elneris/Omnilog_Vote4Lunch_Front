import axios from 'axios'

const initialState = {
    date: null,
    pseudo: '',
    email: ''
}

const vote = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_UP_VOTE':

            fetch(`/api/lunch/up_vote/${action.id}`)

            return {vote_id: action.id, completed: true}
        
        case 'FETCH_DOWN_VOTE':

            fetch(`/api/lunch/down_vote/${action.id}`)

            return {vote_id: action.id, completed: true}
        case 'CREATE_A_VOTE':
        default:
            return state;
    }
}

export default vote;