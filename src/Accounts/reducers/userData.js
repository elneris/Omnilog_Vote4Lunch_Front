const getPseudo = localStorage.getItem('pseudo');
const getEmail = localStorage.getItem('email');

const initialState = {
  pseudo: getPseudo || '',
  email: getEmail || '',
  password: '',
  passwordRepeater: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_USER_DATA':
      return {
        ...state,
        pseudo: action.pseudo,
        email: action.email,
      };
    case 'FORM_INPUT_PSEUDO':
      return {
        ...state,
        pseudo: action.pseudo,
      };
    case 'FORM_INPUT_EMAIL':
      return {
        ...state,
        email: action.email,
      };
    case 'FORM_INPUT_PASSWORD':
      return {
        ...state,
        password: action.password,
      };
    case 'FORM_INPUT_PASSWORD_REPEATER':
      return {
        ...state,
        passwordRepeater: action.passwordRepeater,
      };
    case 'RESET_VOTE_DATA':
      return {
        ...state,
        pseudo: '',
        email: '',
      };
    default:
      return state;
  }
};
