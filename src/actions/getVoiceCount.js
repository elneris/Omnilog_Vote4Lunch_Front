import axios from 'axios'

export const getVoiceCountBegin = () => ({
    type: 'GET_VOICE_COUNT_BEGIN',
});

export const getVoiceCountSuccess = (count,vote_id,place_id) => ({
    type: 'GET_VOICE_COUNT_SUCCESS',
    count,
    vote_id,
    place_id,
});

export const getVoiceCountFailure = error => ({
    type: 'GET_VOICE_COUNT_FAILURE',
    error,
});

export function getVoiceCount(vote_url,place_id) {
    return (dispatch) => {
        dispatch(getVoiceCountBegin());
        return (
            axios
                .get(`/api/vote/get?vote_url=${vote_url}`)
                .then(vote => {
                    const url = `/api/voice/count/all?vote_id=${vote.data.id}&place_id=${place_id}`
                     return axios.get(url).then(result => {
                        return {'count':result.data.count,'vote_id':vote.data.id}
                    })
                })
                .then(result => {
                    
                    dispatch(getVoiceCountSuccess(result.count,result.vote_id,place_id))
                } )
                .catch(error => dispatch(getVoiceCountSuccess(error)))
        );
    };
}