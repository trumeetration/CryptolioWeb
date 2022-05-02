import { all } from "redux-saga/effects";
import {fetchTokenCreateWatcher} from "./auth/createTokenSaga";
import {fetchTokenVerifyWatcher} from "./auth/verifyTokenSaga";
import {getCoinsWatcher} from "./coingecko_api/getCoinsSaga";
import {getPortfoliosWatcher} from "./coingecko_api/getPortfoliosSaga";
import {getPortfoliosRecordsWatcher} from "./coingecko_api/getPortfolioRecordsSaga";
import {fetchSearchCoinsWatcher} from "./coingecko_api/searchCoinsSaga";
import {fetchAddPortfolioWatcher} from "./portfolio/addPortfiolioSaga";
import {fetchEditPortfolioWatcher} from "./portfolio/editPortfolioSaga";
import {fetchDeletePortfolioWatcher} from "./portfolio/deletePortfolioSaga";

export function* rootWatcher() {
    yield all([
        fetchTokenCreateWatcher(),
        getCoinsWatcher(),
        fetchSearchCoinsWatcher(),
        getPortfoliosWatcher(),
        getPortfoliosRecordsWatcher(),
        fetchTokenVerifyWatcher(),
        fetchAddPortfolioWatcher(),
        fetchEditPortfolioWatcher(),
        fetchDeletePortfolioWatcher(),
    ]);
}