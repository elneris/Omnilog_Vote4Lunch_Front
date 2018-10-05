const initialState = {
    date: null,
    pseudo: '',
    email: ''
}

const vote = (state = initialState, action) => {
    switch (action.type) {
        case 'SAVE_VOTE_DATA':
            return { 
                ...state,
                id: action.id,
                date: action.date,
                pseudo: action.pseudo,
                email: action.email
            }
        default:
            return state;
    }
}

export default vote;