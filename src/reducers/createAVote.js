const initialState = {
    result: '',
    loading: false,
    error: null,
  };
  
  const createAVote = (state = initialState, action) => {
    switch (action.type) {
      case 'CREATE_A_VOTE_BEGIN':
        return {
          ...state,
          loading: true,
          error: null,
        };
      case 'CREATE_A_VOTE_SUCCESS':
        return {
          ...state,
          loading: false,
          error: null,
          result: action.result,
        };
      case 'CREATE_A_VOTE_FAILURE':
        return {
          ...state,
          loading: false,
          error: action.error,
        };
      case 'RESET_VOTE_DATA':
      return {
        ...state,
        loading: false,
        error: null,
        result: '',
      };
      default: 
        return state;
    }
  };
  
export default createAVote;