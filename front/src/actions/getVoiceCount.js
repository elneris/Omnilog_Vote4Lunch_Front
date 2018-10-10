import axios from 'axios'

export const getVoiceCountBegin = () => ({
    type: 'GET_VOICE_COUNT_BEGIN',
});

export const getVoiceCountSuccess = (count,place_id) => ({
    type: 'GET_VOICE_COUNT_SUCCESS',
    count,
    place_id
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
                    const url = `/api/vote/get/voice?vote_id=${vote.data.id}&place_id=${place_id}`
                     return axios.get(url).then(result => {
                        return result.data.count
                    })
                })
                .then(count => {
                    dispatch(getVoiceCountSuccess(count,place_id))
                } )
                .catch(error => dispatch(getVoiceCountSuccess(error)))
        );
    };
}