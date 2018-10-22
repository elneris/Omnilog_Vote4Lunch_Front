const initialState = {
    status:false,
    message:''
    }
    
    const TopAlert = (state = initialState, action) => {
        switch (action.type) {
            case 'ON_TOP_ALERT':
                return {...state, message_type:action.message_type, status:true, message:action.message}
            case 'OFF_TOP_ALERT':
                return {...state, status:false}
    
            default:
                return state;
        }
    }
    
    export default TopAlert;