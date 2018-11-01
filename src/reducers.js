import {
    combineReducers
} from "redux";
import {
    reducer as toastrReducer
} from 'react-redux-toastr'
import appReducer from './main/appReducer'

const rootReducer = combineReducers({
    toastr: toastrReducer,
    app:appReducer
})

export default rootReducer