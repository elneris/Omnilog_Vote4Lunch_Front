const initialState = {
status:false,
message:''
}

const OnMapAlert = (state = initialState, action) => {
    switch (action.type) {
        case 'ON_MAP_ALERT':

            return {...state, type:action.type, status:true, message:action.message}

        default:
            return state;
    }
}

export default OnMapAlert;