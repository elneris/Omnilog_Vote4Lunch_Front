const initialState = {
status:false,
message:''
}

const OnMapAlert = (state = initialState, action) => {
    switch (action.type) {
        case 'ON_MAP_ALERT':
            return {...state, message_type:action.message_type, status:true, message:action.message}
        case 'OFF_MAP_ALERT':
            return {...state, status:false}

        default:
            return state;
    }
}

export default OnMapAlert;