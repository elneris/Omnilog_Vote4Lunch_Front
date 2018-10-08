const initialState = {
    id:'',
    date: null,
    pseudo: '',
    email: '',
    places:[]
}

const vote = (state = initialState, action) => {
    switch (action.type) {
        case 'SAVE_VOTE_DATA':
            return { 
                ...state,
                id: action.id,
                date: action.date,
                pseudo: action.pseudo,
                email: action.email,
            }
        case 'ADD_A_PLACE_SUCCESS':
            let newPlaces = state.places
            if (action.result.data.added) {
                newPlaces.push(action.result.data.place)   
            }
            return {
                ...state,
                places:newPlaces
            }
        default:
            return state;
    }
}

export default vote;