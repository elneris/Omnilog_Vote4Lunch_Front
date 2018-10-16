import axios from 'axios'

export const getPlacesListBegin = () => ({
    type: 'GET_PLACES_LIST_BEGIN',
  });
  
  export const getPlacesListSuccess = result => ({
    type: 'GET_PLACES_LIST_SUCCESS',
    result,
  });
  
  export const getPlacesListFailure = error => ({
    type: 'GET_PLACES_LIST_FAILURE',
    error,
  });
  
  export function getPlacesList(vote_url) {
    return (dispatch) => {
      dispatch(getPlacesListBegin());
      return (
        axios({
            url:'/api/vote/get/places/list',
            method:'post',
            data: {
                vote_url: vote_url,
            }
        })
          .then(result => {
            dispatch(getPlacesListSuccess({[vote_url]: result.data}))
          } 
      )
          .catch(error => dispatch(getPlacesListFailure(error)))
      );
    };
  }