import axios from 'axios';

export const addUserBegin = () => ({
  type: 'ADD_USER_BEGIN',
});

export const addUserSuccess = payload => ({
  type: 'ADD_USER_SUCCESS',
  payload,
});

export const addUserFailure = error => ({
  type: 'ADD_USER_FAILURE',
  error,
});

export function addUser(userData) {
  return (dispatch) => {
    dispatch(addUserBegin());
    return (
      axios({
        url: 'http://localhost/api/users',
        method: 'post',
        data: {
          pseudo: userData.pseudo,
          email: userData.email,
          password: userData.password,
          password_repeat: userData.passwordRepeater
        }
      })
        .then(payload => dispatch(addUserSuccess(payload.data)))
        .catch(error => dispatch(addUserFailure(error)))
    );
  };
}
