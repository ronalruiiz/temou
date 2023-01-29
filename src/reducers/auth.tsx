import { authConstants } from '../helpers/constants';

const INITIAL_STATE = {} as any;

export default function authentication(state = INITIAL_STATE, action:any) {
    switch (action.type) {
        // Login
        case authConstants.LOGIN_SUCCESS:
            return {...state,
                ...state,
                user: action.payload.user,
                auth_token: action.payload.auth_token
            }
        case authConstants.LOGIN_REQUEST:
            return {
                ...state,
                request: action.payload
            };
        case authConstants.LOGIN_FAILURE:
            return {
                ...state,
                statusMsg: action.payload
            };
        case authConstants.SET_ERROR_MSG:
            return {
                ...state,
                statusMsg: action.payload
            };
        case authConstants.LOGOUT:
            return {};

        // Register
        case authConstants.REGISTER_SUCCESS:
            return {
                ...state,
                user: action.payload.user,
                auth_token: action.payload.auth_token
            };
        case authConstants.REGISTER_FAILURE:
            return {
                ...state,
                statusMsg: action.payload
            };
        case authConstants.REGISTER_REQUEST:
            return {
                ...state,
                statusMsg: action.payload
            };
            
        default:
            return state
    }
}