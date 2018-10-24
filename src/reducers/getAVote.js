const initialState = {
  result: '',
  loading: false,
  error: null,
};

const getAvote = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_A_VOTE_BEGIN':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'GET_A_VOTE_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
        result: action.result,
      };
    case 'GET_A_VOTE_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default getAvote;
