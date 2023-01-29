import axios from '../helpers/axiosInterceptor';
import { therapyConstant } from '../helpers/constants';


export const index = (history:any) => async (dispatch:any) => {
    try {
        const response  = await axios.get('/therapy');
    }catch (e:any) {
        const response = e.response.data
        dispatch({ type: therapyConstant.STORE_INDEX, payload: response.message });
        history.replace('/')
    }
    
}

export const clear = () =>({ type: therapyConstant.CLEAR_MESSAGE })

export const store = (formData:any, history:any) => async (dispatch:any) => {
    try {
        const response  = await axios.post('/therapy', formData);
        await dispatch({ type: therapyConstant.STORE_SUCCESS, payload: response })

    }catch (e:any) {
        const response = e.response.data
        dispatch({ type: therapyConstant.STORE_FAILURE, payload: response.message });
        history.replace('/')
    }
}

export default {
    store,
    index,
    clear
}