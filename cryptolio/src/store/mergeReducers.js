import {applyMiddleware, combineReducers, createStore} from "redux";
import {activePageReducer} from "./reducers/activePageReducer";
import {authModalReducer} from "./reducers/authModalReducer";
import createSagaMiddleware from "redux-saga";
import {rootWatcher} from "./saga/sagaMerge";

const rootReducer = combineReducers({
    activePageReducer,
    authModalReducer,
});

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootWatcher);