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
