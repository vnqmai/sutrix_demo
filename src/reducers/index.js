import { combineReducers } from "redux";
import { filterReducer } from "./filter";
import { staffReducer } from './staff';

export const rootReducer = combineReducers({
    filter: filterReducer,
    staff: staffReducer
});