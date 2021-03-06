import axios from 'axios';

export const deleteAPlaceBegin = () => ({
  type: 'DELETE_A_PLACE_BEGIN',
});

export const deleteAPlaceSuccess = result => ({
  type: 'DELETE_A_PLACE_SUCCESS',
  result,
});

export const deleteAPlaceFailure = error => ({
  type: 'DELETE_A_PLACE_FAILURE',
  error,
});

export function deleteAPlace(voteId, placeId) {
  const token = localStorage.getItem('token');
  return (dispatch) => {
    dispatch(deleteAPlaceBegin());
    return (
      axios({
        url: `http://localhost/api/votes/${voteId}/del_place`,
        headers: { Authorization: `Bearer ${token}` },
        method: 'put',
        data: {
          vote_id: voteId,
          place_id: placeId,
        }
      })
        .then((result) => {
          dispatch(deleteAPlaceSuccess(result.data));
        })
        .catch(error => dispatch(deleteAPlaceFailure(error)))
    );
  };
}
