// eslint-disable-next-line no-unused-vars
import { loginUser } from '../../actions';

const jwt = require('jsonwebtoken');

const getPseudo = localStorage.getItem('pseudo');
const getEmail = localStorage.getItem('email');
const getAuthenticated = localStorage.getItem('authenticated');
const getToken = localStorage.getItem('token');

const initialState = {
  pseudo: getPseudo || '',
  email: getEmail || '',
  token: getToken || '',
  password: '',
  passwordRepeater: '',
  authenticated: JSON.parse(getAuthenticated) || false,
  loading: false,
  loginError: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_USER_DATA':
      return {
        ...state,
        pseudo: action.pseudo,
        email: action.email,
        token: action.token,
        authenticated: action.authenticated,
      };
    case 'FORM_INPUT_PSEUDO':
      return {
        ...state,
        pseudo: action.pseudo,
        token: action.token,
      };
    case 'FORM_INPUT_EMAIL':
      return {
        ...state,
        email: action.email,
        token: action.token,
      };
    case 'FORM_INPUT_PASSWORD':
      return {
        ...state,
        password: action.password,
        token: action.token,
      };
    case 'FORM_INPUT_PASSWORD_REPEATER':
      return {
        ...state,
        passwordRepeater: action.passwordRepeater,
        token: action.token,
      };
    case 'RESET_VOTE_DATA':
      return {
        ...state,
        pseudo: '',
        email: '',
        token: action.token,
        authenticated: false,
      };
    case 'LOGIN_USER_BEGIN':
      return {
        ...state,
        loading: true,
        loginError: false,
        token: action.token,
      };
    case 'LOGIN_USER_SUCCESS':
      const token = action.payload.token;
      const pseudo = jwt.decode(token);
      localStorage.setItem('token', token);
      localStorage.setItem('pseudo', pseudo.pseudo);
      localStorage.setItem('email', pseudo.email);
      localStorage.setItem('authenticated', JSON.stringify(true));
      return {
        ...state,
        loading: false,
        pseudo: action.payload.pseudo,
        email: action.payload.email,
        token: action.token,
        authenticated: true,
      };
    case 'LOGIN_USER_FAILURE':
      return {
        ...state,
        loading: false,
        loginError: true,
      };
    case 'RESET_LOGIN_FAILURE':
      return {
        ...state,
        loginError: false,
      };
    case 'RESET_PASSWORD_DATA':
      return {
        ...state,
        pseudo: '',
        email: '',
        password: '',
        passwordRepeater: '',
      };
    case 'RESET_USER_DATA':
      localStorage.removeItem('pseudo');
      localStorage.removeItem('email');
      localStorage.removeItem('authenticated');
      return {
        ...state,
        pseudo: '',
        email: '',
        authenticated: false,
        password: '',
        passwordRepeater: '',
      };
    default:
      return state;
  }
};
