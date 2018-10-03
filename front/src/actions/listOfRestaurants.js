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
  
  export function fetchRestaurants(northEastLat, northEastLon, southWestLat, southWestLon) {
    return (dispatch) => {
      dispatch(fetchRestaurantsBegin());
      const bbox = `[bbox:${southWestLat},${southWestLon},${northEastLat},${northEastLon}]`
      const restaurants = `node[amenity=restaurant];`
      const fast_foods = `node[amenity=fast_food];`
      const bakeries = `node[shop=bakery];`
      const url = `http://overpass-api.de/api/interpreter?data=${bbox}[out:json];(${restaurants}${fast_foods}${bakeries});out;`
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