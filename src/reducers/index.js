import { combineReducers } from "redux";
import { filterReducer } from "./filter";

export const rootReducer = combineReducers({
    filter: filterReducer
});