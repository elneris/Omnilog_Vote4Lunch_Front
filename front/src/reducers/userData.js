const initialState = {
    pseudo: '',
    email: '',
}

const vote = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_USER_DATA':
        return {
            ...state,
            pseudo: action.pseudo,
            email: action.email,
        }
        default:
            return state;
    }
}

export default vote;