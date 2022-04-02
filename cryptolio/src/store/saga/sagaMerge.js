import { all } from "redux-saga/effects";
import {tokenCreateWatcher} from "./auth/createTokenSaga";
import {fetchTokenVerifyWatcher} from "./auth/verifyTokenSaga";
import {getCoinsWatcher} from "./coingecko_api/getCoinsSaga";
import {getPortfoliosWatcher} from "./coingecko_api/getPortfoliosSaga";

export function* rootWatcher() {
    yield all([
        tokenCreateWatcher(),
        getCoinsWatcher(),
        getPortfoliosWatcher(),
        fetchTokenVerifyWatcher(),
    ]);
}