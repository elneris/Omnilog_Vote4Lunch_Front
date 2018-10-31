export default (id, date, pseudo, email, url) => ({
  type: 'SAVE_VOTE_DATA',
  id,
  date,
  pseudo,
  email,
  url
});
