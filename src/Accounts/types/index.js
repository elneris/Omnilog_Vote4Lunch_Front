import {
  shape,
  string,
  bool,
  oneOfType,
} from 'prop-types';

const asyncActionreducerShape = payloadState => (
  shape({
    payload: shape({
      [payloadState]: bool.isRequired
    }).isRequired,
    loading: bool.isRequired,
    error: string,
  })
);

export const addUserReducerTypes = asyncActionreducerShape('created');

export const emailCheckerTypes = asyncActionreducerShape('exist');

export const userDataTypes = shape({
  pseudo: string.isRequired,
  email: string.isRequired,
  password: string.isRequired,
  passwordRepeater: string.isRequired,
  authenticated: bool.isRequired,
  loading: bool.isRequired,
  loginError: oneOfType([
    string,
    bool
  ]),
});
