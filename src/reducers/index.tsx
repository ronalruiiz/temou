import { combineReducers } from "redux"
import auth from './auth'
import alert from './alert'
import therapy from './therapy'

export default combineReducers({
    auth,
    therapy,
    alert
})
