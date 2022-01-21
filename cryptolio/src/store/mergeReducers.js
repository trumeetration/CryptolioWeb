import {combineReducers, createStore} from "redux";
import {activePageReducer} from "./reducers/activePageReducer";

const rootReducer = combineReducers({
    activePageReducer,
});

export const store = createStore(rootReducer);
