
import { therapyConstant } from '../helpers/constants';

const INITIAL_STATE = {} as any;

export default function therapy(state = INITIAL_STATE, action:any) {

    switch (action.type) {
        case therapyConstant.STORE_REQUEST:
            return {
                ...state,
                request: action.payload
            };
        
            case therapyConstant.STORE_FAILURE:
                return {
                    ...state,
                    errorMsg: action.payload
                };
            case therapyConstant.INDEX_REQUEST:
                return {
                    ...state,
                    request: action.payload
                };
        default:
            return state
    }
}