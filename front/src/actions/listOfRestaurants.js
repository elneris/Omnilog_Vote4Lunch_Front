import axios from 'axios'

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
      const bbox = `sw_lat=${southWestLat}&sw_lng=${southWestLon}&ne_lat=${northEastLat}&ne_lng=${northEastLon}`

      const url = `/api/places/list?${bbox}`
      return (
        fetch(url)
          .then((res) => {
            if (!res.ok) {
              throw Error(res.statusText);
            }
            return res.json();
          })
          .then(restaurants => dispatch(fetchRestaurantsSuccess(restaurants)))
          .catch(error => dispatch(fetchRestaurantsFailure(error)))
      );
    };
  }