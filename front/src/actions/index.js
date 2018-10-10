export const fetchUpVote = id => ({
    type: 'FETCH_UP_VOTE',
    id
  });

  export const fetchDownVote = id => ({
    type: 'FETCH_DOWN_VOTE',
    id
  });

  export const saveVoteData = (id,date, pseudo, email, url) => ({
    type: 'SAVE_VOTE_DATA',
    id,
    date,
    pseudo,
    email,
    url
  })

export const onMapAlert = (message_type,message) => ({
  type: 'ON_MAP_ALERT',
  message_type,
  message
})

export const offMapAlert = () => ({
  type: 'OFF_MAP_ALERT',
})
