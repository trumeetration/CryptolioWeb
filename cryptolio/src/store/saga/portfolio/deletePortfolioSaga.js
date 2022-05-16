import {call, put, takeEvery} from "redux-saga/effects";
import {updateGlobalAlertList} from "../../actions/activePageActions";
import {FETCH_DELETE_PORTFOLIO, FETCH_EDIT_PORTFOLIO} from "../../types/authModalTypes";
import {fetchGetPortfolios} from "../../actions/authModalActions";
import {Url} from "../../../constans/global";

const request = (id) => {
    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${localStorage.getItem('accessToken')}`);
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
        "portfolioId": id
    });

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    return fetch(`${Url}/portfolio/delete`, requestOptions);
}

function* fetchDeletePortfolioWorker({id}) {
    const data = yield call(
        request,
        id,
    );
    if (data.status === 200)
    {
        yield put(updateGlobalAlertList({id:Math.random(), header: `Success`, body: `Portfolio removed`}))
        yield put(fetchGetPortfolios());
    }
}


export function* fetchDeletePortfolioWatcher() {
    yield takeEvery(FETCH_DELETE_PORTFOLIO, fetchDeletePortfolioWorker);
}