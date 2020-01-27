import { combineReducers } from "redux";
import { filterReducer } from "./filter";
import { staffReducer } from './staff';
import { authReducer } from './auth';

export const rootReducer = combineReducers({
    filter: filterReducer,
    staff: staffReducer,
    auth: authReducer
});