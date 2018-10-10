const containPlaceObject = (obj, list) => {

    for (let i = 0; i < list.length; i++) {
        if (list[i].place === obj.place) {
            return true
        }
    }
    return false
}

const voicescount = (state = [], action) => {
    switch (action.type) {
        case 'GET_VOICE_COUNT_SUCCESS':
            const newCount = { count: action.count, place: action.place_id }
            const newState = [...state]
            if (!containPlaceObject(newCount, newState)) {
                newState.push(newCount)
            } else {
                newState.map(e => {
                    if (e.place === action.place_id) {
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