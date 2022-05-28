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
import {fetchAddPortfolioRecordsWatcher} from "./portfolio/addPortfolioRecordsSaga";
import {getCoinHistoryWatcher} from "./coingecko_api/getCoinHistorySaga";
import {fetchRemoveTransactionWatcher} from "./portfolio/removeTransactionSaga";
import {fetchRemoveCoinWithTransactionsWatcher} from "./portfolio/removeCoinWithTransactionsSaga";
import {fetchRegistrationWatcher} from "./auth/registrationSaga";
import {fetchRecoverTransactionWatcher} from "./portfolio/recoverTransactionSaga";
import {fetchGetCoinInfoWatcher} from "./coingecko_api/getCoinInfoSaga";
import {getCoinPriceByIntervalWatcher} from "./coingecko_api/getCoinPriceByInterval";

export function* rootWatcher() {
    yield all([
        fetchTokenCreateWatcher(),
        fetchRegistrationWatcher(),
        getCoinsWatcher(),
        fetchSearchCoinsWatcher(),
        getPortfoliosWatcher(),
        getPortfoliosRecordsWatcher(),
        fetchTokenVerifyWatcher(),
        fetchAddPortfolioWatcher(),
        fetchEditPortfolioWatcher(),
        fetchDeletePortfolioWatcher(),
        fetchAddPortfolioRecordsWatcher(),
        getCoinHistoryWatcher(),
        fetchRemoveTransactionWatcher(),
        fetchRemoveCoinWithTransactionsWatcher(),
        fetchRecoverTransactionWatcher(),
        fetchGetCoinInfoWatcher(),
        getCoinPriceByIntervalWatcher(),
    ]);
}