import { FormInputPseudo, FormInputEmail, FormInputDate, FormInputEndDate } from './FormInput';

export const saveVoteData = (id, date, pseudo, email, url) => ({
  type: 'SAVE_VOTE_DATA',
  id,
  date,
  pseudo,
  email,
  url
});

export const resetVoteData = () => ({
  type: 'RESET_VOTE_DATA',
});

export const updateUserData = (pseudo, email) => ({
  type: 'UPDATE_USER_DATA',
  pseudo,
  email,
});

export const onTopAlert = (messageType, message) => ({
  type: 'ON_TOP_ALERT',
  messageType,
  message
});

export const offTopAlert = () => ({
  type: 'OFF_TOP_ALERT',
});

export {
  FormInputPseudo,
  FormInputEmail,
  FormInputDate,
  FormInputEndDate
};
