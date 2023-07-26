import { combineReducers } from "redux"
import userReducer from './user'
import modelReducer from './model'
import courseReducer from './course'

const reducer = combineReducers({
    user: userReducer,
    model: modelReducer,
    course: courseReducer
})

export default reducer