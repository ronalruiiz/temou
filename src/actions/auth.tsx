import axios from '../helpers/axiosInterceptor';
import { authConstants } from '../helpers/constants';

export const login = (formData:any, history:any) => async (dispatch:any) => {
    try {
        const response = await axios.post('/login', formData);
        const user_data = response.data

        await dispatch({ type: authConstants.LOGIN_SUCCESS, payload: user_data })

        window.location.href = '/dashboard/home'

    }catch (e:any) {
        const response = e.response.data
        dispatch({ type: authConstants.LOGIN_FAILURE, payload: response.errors });
    }
}

export const register = (formData, history) => async dispatch => {
    try {
        
        const response = await axios.post('/register', formData);
        const data = response.data
        dispatch({ type: authConstants.REGISTER_SUCCESS, payload: data });

        window.location.href = '/dashboard/home'

    } catch (e:any) {
        const response = e.response.data
        dispatch({ type: authConstants.REGISTER_FAILURE, payload: response.errors });
    }
};

function logout() {
    return { type: authConstants.LOGOUT }
}

export default {
    login,
    register,
    logout
}