import {call, put, takeEvery} from "redux-saga/effects";
import {updateIsAddPortfolioLoading} from "../../actions/authModalActions";
import {updateGlobalAlertList} from "../../actions/activePageActions";
import {FETCH_EDIT_PORTFOLIO} from "../../types/authModalTypes";

const request = (id, name) => {
    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${localStorage.getItem('accessToken')}`);
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
        "id": id,
        "name": name
    });

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    return fetch("https://localhost:5001/portfolio/update", requestOptions);
}

function* fetchEditPortfolioWorker({id, name}) {
    console.log(id, name);
    const data = yield call(
        request,
        id,
        name
    );
    if (data.status !== 400)
    {
        yield put(updateGlobalAlertList({id:Math.random(), header: `Success`, body: `Portfolio edited`}))
    }
    else {
        yield put(updateGlobalAlertList({id:Math.random(), header: `Failed`, body: `Portfolio with given name already exists`}))
    }
}


export function* fetchEditPortfolioWatcher() {
    yield takeEvery(FETCH_EDIT_PORTFOLIO, fetchEditPortfolioWorker);
}