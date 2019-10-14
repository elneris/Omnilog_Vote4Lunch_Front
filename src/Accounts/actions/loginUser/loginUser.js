import axios from 'axios';

export const loginUserBegin = () => ({
  type: 'LOGIN_USER_BEGIN',
});

export const loginUserSuccess = payload => ({
  type: 'LOGIN_USER_SUCCESS',
  payload,
});

export const loginUserFailure = error => ({
  type: 'LOGIN_USER_FAILURE',
  error,
});

export const resetLoginFailure = () => ({
  type: 'RESET_LOGIN_FAILURE',
});

export function loginUser(username, password) {
  return (dispatch) => {
    dispatch(loginUserBegin());
    return (
      axios({
        url: 'http://localhost/api/login_check',
        method: 'post',
        data: {
          username,
          password,
        }
      })
        .then((payload) => {
          if (payload.data.token) {
            dispatch(loginUserSuccess(payload.data));
          } else {
            const error = new Error('votre pseudo ou votre mot de passe est erroné');
            dispatch(loginUserFailure(error));
          }
        })
        .catch(error => dispatch(loginUserFailure(error)))
    );
  };
}
