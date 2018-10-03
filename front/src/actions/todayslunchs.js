export const fetchTodaysLunchsBegin = () => ({
    type: 'FETCH_TODAYSLUNCHS_BEGIN',
  });
  
  export const fetchTodaysLunchsSuccess = todayslunchs => ({
    type: 'FETCH_TODAYSLUNCHS_SUCCESS',
    todayslunchs,
  });
  
  export const fetchTodaysLunchsFailure = error => ({
    type: 'FETCH_TODAYSLUNCHS_FAILURE',
    error,
  });
  
  export function fetchTodaysLunchs() {
    return (dispatch) => {
      dispatch(fetchTodaysLunchsBegin());
      return (
        fetch('/api/lunch/today')
          .then((res) => {
            if (!res.ok) {
              throw Error(res.statusText);
            }
            return res.json();
          })
          .then(todayslunchs => dispatch(fetchTodaysLunchsSuccess(todayslunchs)))
          .catch(error => dispatch(fetchTodaysLunchsFailure(error)))
      );
    };
  }