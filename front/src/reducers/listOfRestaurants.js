const initialState = {
    list: [],
    loading: false,
    error: null,
  };
  
  const restaurants = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_RESTAURANTS_BEGIN':
        return {
          ...state,
          loading: true,
          error: null,
        };
      case 'FETCH_RESTAURANTS_SUCCESS':
        return {
          loading: false,
          error: null,
          list: action.restaurants.elements,
        };
      case 'FETCH_RESTAURANTS_FAILURE':
        return {
          ...state,
          loading: false,
          error: action.error,
        };
      default: 
        return state;
    }
  };
  
export default restaurants;