const initialState = {
    pseudo: null,
    email: null,
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