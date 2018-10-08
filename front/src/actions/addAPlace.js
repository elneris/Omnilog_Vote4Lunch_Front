import axios from 'axios'

export const addAPlaceBegin = () => ({
    type: 'ADD_A_PLACE_BEGIN',
  });
  
  export const addAPlaceSuccess = result => ({
    type: 'ADD_A_PLACE_SUCCESS',
    result,
  });
  
  export const addAPlaceFailure = error => ({
    type: 'ADD_A_PLACE_FAILURE',
    error,
  });
  
  export function addAPlace(vote_id,place_id) {
    return (dispatch) => {
      dispatch(addAPlaceBegin());
      return (
        axios({
            url:'/api/vote/add/place',
            method:'post',
            data: {
                vote_id: vote_id,
                place_id: place_id,
            }
        })
          .then(result => {
            console.log(result);
            
            dispatch(addAPlaceSuccess(result))
          } 
      )
          .catch(error => dispatch(addAPlaceFailure(error)))
      );
    };
  }