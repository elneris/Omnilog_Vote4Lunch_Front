
const initialState = {
count: []
}

const voicescount = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_VOICE_COUNT_SUCCESS':
            const NewCount = [...state.count]
            NewCount.push({count:action.count,place:action.place_id})
            return {...state, count:NewCount}
        default:
            return state;
    }
}

export default voicescount;