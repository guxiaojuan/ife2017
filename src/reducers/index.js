import { createStore, combineReducers } from 'redux'
import { routerReducer as routing } from "react-router-redux"
import questionnaires from "./questionnaires"
import dialog from "./dialog"
import calendar from "./calendar"

const rootReducer = combineReducers({
    questionnaires,
    dialog,
    calendar,
    routing
})

const store = createStore(rootReducer, initialState)
export default store
