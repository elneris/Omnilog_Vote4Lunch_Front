const getPseudo = localStorage.getItem('pseudo');
const getEmail = localStorage.getItem('email');

const initialState = {
  pseudo: getPseudo || '',
  email: getEmail || '',
  date: '',
  endDate: '',
  endTime: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'FORM_INPUT_PSEUDO':
      return {
        ...state,
        pseudo: action.pseudo
      };
    case 'FORM_INPUT_EMAIL':
      return {
        ...state,
        email: action.email
      };
    case 'FORM_INPUT_DATE':
      return {
        ...state,
        date: action.date
      };
    case 'FORM_INPUT_END_DATE':
      return {
        ...state,
        endDate: action.endDate,
        endTime: action.endTime
      };
    case 'UPDATE_USER_DATA':
      return {
        ...state,
        pseudo: action.pseudo,
        email: action.email
      };
    default:
      return state;
  }
};
