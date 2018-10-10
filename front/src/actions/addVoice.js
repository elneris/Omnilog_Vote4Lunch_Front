import axios from 'axios'
import { getVoiceCount } from './getVoiceCount'

export const addVoiceBegin = () => ({
    type: 'ADD_VOICE_BEGIN',
  });
  
  export const addVoiceSuccess = result => ({
    type: 'ADD_VOICE_SUCCESS',
    result,
  });
  
  export const addVoiceFailure = error => ({
    type: 'ADD_VOICE_FAILURE',
    error,
  });
  
  export function addVoice(vote_url,place_id) {
    return (dispatch) => {
      dispatch(addVoiceBegin());
      return (
        axios
            .get(`/api/vote/get?vote_url=${vote_url}`)
            .then( vote => {
                return axios({
                    url:'/api/vote/add/voice',
                    method:'post',
                    data: {
                        vote_id: vote.data.id,
                        place_id: place_id,
                    }
                })
                .then(result => {
                    return result.data
                })
            })
            .then(result => {
                dispatch(addVoiceSuccess(result))
                dispatch(getVoiceCount(vote_url,place_id))
            })
            .catch(error => dispatch(addVoiceFailure(error)))
    );
     
    };
  }