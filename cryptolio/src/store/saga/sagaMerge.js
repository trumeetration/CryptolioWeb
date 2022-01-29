import { all } from "redux-saga/effects";
import {tokenCreateWatcher} from "./auth/createTokenSaga";

export function* rootWatcher() {
    yield all([
        tokenCreateWatcher(),
    ]);
}