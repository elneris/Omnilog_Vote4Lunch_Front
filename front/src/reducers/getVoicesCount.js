const voicescount = (state = [], action) => {
    switch (action.type) {
        case 'GET_VOICE_COUNT_SUCCESS':
            
            const newCount = { count: action.count,vote_id:action.vote_id, place: action.place_id }
            
            const newState = [...state]
            if (!newState.some(e => e.vote_id === action.vote_id && e.place === action.place_id)) {
                newState.push(newCount)
            } else {
                newState.map(e => {
                    if (e.place === action.place_id && e.vote_id === action.vote_id) {
                        e.count = action.count
                    }
                    return e
                })
            }
            
            return [...newState]
        default:
            return state;
    }
}

export default voicescount;