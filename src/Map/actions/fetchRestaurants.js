import axios from 'axios';

export const fetchRestaurantsBegin = () => ({
  type: 'FETCH_RESTAURANTS_BEGIN',
});

export const fetchRestaurantsSuccess = restaurants => ({
  type: 'FETCH_RESTAURANTS_SUCCESS',
  restaurants,
});

export const fetchRestaurantsFailure = error => ({
  type: 'FETCH_RESTAURANTS_FAILURE',
  error,
});

export function fetchRestaurants(southWestLat, southWestLon, northEastLat, northEastLon) {
  return (dispatch) => {
    dispatch(fetchRestaurantsBegin());
    const bbox = `sw_lat=${southWestLat}&sw_lng=${southWestLon}&ne_lat=${northEastLat}&ne_lng=${northEastLon}`;

    const url = `http://localhost/api/place/list?${bbox}`;
    return (
      axios.get(url)
        .then(restaurants => dispatch(fetchRestaurantsSuccess(restaurants.data)))
        .catch(error => dispatch(fetchRestaurantsFailure(error)))
    );
  };
}
