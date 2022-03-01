import { all } from "redux-saga/effects";
import {tokenCreateWatcher} from "./auth/createTokenSaga";
import {fetchTokenVerifyWatcher} from "./auth/verifyTokenSaga";

export function* rootWatcher() {
    yield all([
        tokenCreateWatcher(),
        fetchTokenVerifyWatcher(),
    ]);
}