import { all } from "redux-saga/effects";
import {tokenCreateWatcher} from "./auth/createTokenSaga";
import {fetchTokenVerifyWatcher} from "./auth/verifyTokenSaga";
import {getCoinsWatcher} from "./coingecko_api/getCoinsSaga";
import {getPortfoliosWatcher} from "./coingecko_api/getPortfoliosSaga";
import {getPortfoliosRecordsWatcher} from "./coingecko_api/getPortfolioRecordsSaga";
import {getCoinDataWatcher} from "./coingecko_api/getCoinDataSaga";

export function* rootWatcher() {
    yield all([
        tokenCreateWatcher(),
        getCoinsWatcher(),
        getCoinDataWatcher(),
        getPortfoliosWatcher(),
        getPortfoliosRecordsWatcher(),
        fetchTokenVerifyWatcher(),
    ]);
}