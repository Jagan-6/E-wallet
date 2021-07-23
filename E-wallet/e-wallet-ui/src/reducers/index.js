import {combineReducers} from "redux";
import InfoReducer from "./InfoReducer";

const reducers=combineReducers({
    info:InfoReducer
})

export default reducers;