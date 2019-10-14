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

/*export function fetchRestaurants(southWestLat, southWestLon, northEastLat, northEastLon) {
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
}*/

export function fetchRestaurants(southWestLat, southWestLon, northEastLat, northEastLon) {
  return (dispatch) => {
    dispatch(fetchRestaurantsBegin());
    let lat1 = `${northEastLat}`;
    let lat2 = `${southWestLat}`;

    if (southWestLat < northEastLat) {
      let lat1 = `${southWestLat}`;
      let lat2 = `${northEastLat}`;
    }
    let lon1 = `${northEastLon}`;
    let lon2 = `${southWestLon}`;

    if (southWestLon < northEastLon) {
      let lon1 = `${southWestLon}`;
      let lon2 = `${northEastLon}`;
    }

    const bbox = `lat%5Bgte%5D=${lat1}&lat%5Blte%5D=${lat2}&lng%5Bgte%5D=${lon1}&lng%5Blte%5D=${lon2}`;

    const url = `http://localhost/api/places?${bbox}`;
    return (
      axios.get(url)
        .then(restaurants => dispatch(fetchRestaurantsSuccess(restaurants.data['hydra:member'])))
        .catch(error => dispatch(fetchRestaurantsFailure(error)))
    );
  };
}
