export const fetchUpVote = id => ({
    type: 'FETCH_UP_VOTE',
    id
  });

  export const fetchDownVote = id => ({
    type: 'FETCH_DOWN_VOTE',
    id
  });

  export const saveVoteData = (id,date, pseudo, email) => ({
    type: 'SAVE_VOTE_DATA',
    id,
    date,
    pseudo,
    email
  })


export const OnMapAlert = (type,status,message) => ({
  type: 'ON_MAP_ALERT',
  type,
  status,
  message
})