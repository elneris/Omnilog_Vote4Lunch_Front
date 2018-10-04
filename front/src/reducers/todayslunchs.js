const initialState = {
    list: [],
    loading: false,
    error: null,
  };
  
  const todayslunchs = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_TODAYSLUNCHS_BEGIN':
        return {
          ...state,
          loading: true,
          error: null,
        };
      case 'FETCH_TODAYSLUNCHS_SUCCESS':
        return {
          loading: false,
          error: null,
          list: action.todayslunchs,
        };
      case 'FETCH_TODAYSLUNCHS_FAILURE':
        return {
          ...state,
          loading: false,
          error: action.error,
        };
      default: 
        return state;
    }
  };
  
export default todayslunchs;