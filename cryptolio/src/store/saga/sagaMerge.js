import { all } from "redux-saga/effects";
import {tokenCreateWatcher} from "./auth/createTokenSaga";
import {fetchTokenVerifyWatcher} from "./auth/verifyTokenSaga";
import {getCoinsWatcher} from "./coingecko_api/getCoinsSaga";

export function* rootWatcher() {
    yield all([
        tokenCreateWatcher(),
        getCoinsWatcher(),
        fetchTokenVerifyWatcher(),
    ]);
}