import axios from 'axios';

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

export function addAPlace(voteId, placeId) {
  return (dispatch) => {
    dispatch(addAPlaceBegin());
    return (
      axios({
        url: `http://localhost/api/votes/${voteId}`,
        method: 'put',
        data: {
          places: [`/api/places/${placeId}`],
        }
      })
        .then(result => dispatch(addAPlaceSuccess(result.data)))
        .catch(error => dispatch(addAPlaceFailure(error)))
    );
  };
}
