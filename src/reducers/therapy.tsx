
import { therapyConstant } from '../helpers/constants';

const INITIAL_STATE = {} as any;

export default function therapy(state = INITIAL_STATE, action:any) {

    switch (action.type) {
        case therapyConstant.INDEX_REQUEST:
            return {
                ...state,
                request: action.payload
            };
        case therapyConstant.STORE_SUCCESS:
            return {
                ...state,
                therapy: action.payload.data,
                statusMsg: action.payload.message
            };
        
        case therapyConstant.STORE_FAILURE:
            return {
                ...state,
                statusMsg: action.payload
            };
        case therapyConstant.CLEAR_MESSAGE:
            return {
                ...state,
                statusMsg: null
            };
        default:
            return state
    }
}