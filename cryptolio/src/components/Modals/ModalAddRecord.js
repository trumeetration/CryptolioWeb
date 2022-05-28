import React, {useEffect, useRef, useState} from "react";
import {TextInput} from "../../UI/Inputs/textInput";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {
    fetchAddPortfolioRecords,
    fetchGetCoinHistory, fetchGetPortfolios,
    fetchSearchCoins,
    updateIsOpenAddRecordsModal, updateIsOpenSearchCoinModal,
    updateSelectedCoin
} from "../../store/actions/authModalActions";
import {LoginLoader} from "../../UI/Loaders/loginLoader";
import './stylesModalAddRecords.css';

const ModalAddRecordLayout = ({info, updateIsOpenAddRecordsModal, updateSelectedCoin, fetchGetCoinHistory, fetchAddPortfolioRecords, updateIsOpenSearchCoinModal, fetchGetPortfolios}) => {
    useEffect(() => {
        if (info.selectedCoin !== null) isFollowCheck(info.selectedCoin);
        SetMaxTransaction();
    }, [])
    useEffect(() => {
        if (info.coinHistory !== null) setMarketPrice(info.coinHistory.marketPrice)
    }, [info.coinHistory])
    const [isBuy, updateIsBuy] = useState(false);
    const [isSell, updateIsSell] = useState(false);
    const [isFollow, updateIsFollow] = useState(false);
    const [isFollowExist, updateIsFollowExist] = useState(false);
    const [amount, setAmount] = useState(0);
    const [marketPrice, setMarketPrice] = useState(0);
    const [transactionDate, setTransactionDate] = useState('');
    const [maxTransactionDate, setMaxTransactionDate] = useState('');
    const [transactionTime, setTransactionTime] = useState('');
    const [note, setNote] = useState('');
    const [total, setTotal] = useState(0);
    const isFollowCheck = (el) => {
        if (el !== null) {
            updateIsFollowExist(false);
            Object.keys(info.portfolioRecordsList).map((coin) => {
                if (coin === el.id) info.portfolioRecordsList[coin].map((el) => {
                    if (el.recordType === 'follow') {updateIsFollowExist(true); return 0}
                    else {updateIsFollowExist(false); return 0}
                })
            })
        }

    }
    const SetMaxTransaction = () => {
        let date = new Date();
        let year = date.toLocaleDateString('ru', { year: 'numeric' });
        let month = date.toLocaleDateString('ru', { month: '2-digit' });
        let day = date.toLocaleDateString('ru', { day: '2-digit' });
        let hour = date.toLocaleTimeString('ru', { hour: '2-digit' });
        let minute = date.toLocaleTimeString('ru', { minute: '2-digit' });
        if (hour < 10) hour = '0' + hour;
        if (minute < 10) minute = '0' + minute;
        setMaxTransactionDate(`${year}-${month}-${day}`);
        setTransactionDate(`${year}-${month}-${day}`);
        setTransactionTime(`${hour}:${minute}`);
    }
    const SetMarketPriceByDate = () => {
        let arr = transactionDate.split('-');
        let preparedData = {
            coinId: info.selectedCoin.id,
            date: `${arr[2]}-${arr[1]}-${arr[0]}`
        };
        fetchGetCoinHistory(preparedData);
    }
    const AddTransactionHandler = () => {
        let isSuccess = false;
        if (amount > 0 && marketPrice > 0 && transactionDate.trim() !== '' && transactionTime.trim() !== '' && (isBuy || isSell)) isSuccess = true;
        if (isFollow) isSuccess = true;
        let transactionType = '';
        if (isSell) transactionType = 'sell';
        if (isBuy) transactionType = 'buy';
        if (isFollow) transactionType = 'follow';
        //console.log(isSuccess);
        if (isSuccess) {
            updateIsOpenAddRecordsModal(false);
            const dt = Date.parse(transactionDate + ' ' + transactionTime);
            //console.log(dt / 1000);
            //console.log(info.portfolioList[info.selectedPortfolio].id, info.selectedCoin.id, transactionDate, marketPrice, amount, note, transactionType);
            fetchAddPortfolioRecords({
                portfolioId: info.portfolioList[info.selectedPortfolio].id,
                coinId: info.selectedCoin.id,
                txTime: dt / 1000,
                txPrice: marketPrice,
                amount: amount,
                note: note,
                recordType: transactionType
            })
            fetchGetPortfolios();
        }
    }
    useEffect(() => {
        if (transactionDate !== '' && info.selectedCoin !== null) SetMarketPriceByDate();
    }, [transactionDate])
    useEffect(() => {
        setTotal(amount * marketPrice);
    }, [amount, marketPrice])
    return (
        <div className="modal">
            <div className="my-modal" style={{width: 500, maxHeight: '100%'}}>
                <div className="header-modal mb-4">
                    <div></div>
                    <div className="h5">Добавление в <span className="text-primary">{info.portfolioList[info.selectedPortfolio].portfolioName}</span></div>
                    <button type="button" className="btn-close" onClick={() => {updateIsOpenAddRecordsModal(false)}}/>
                </div>
                {info.selectedCoin !== null ?
                    <>
                        <div className="body-modal">
                            <div className="d-flex align-items-center ms-4 me-4">
                                <img src={info.selectedCoin.large} alt={'oops'} style={{width: '35px', height: '35px'}}/>
                                <div className="ms-2 me-2 fw-bold" style={{textOverflow: 'clip', textWrap: 'none'}}>{info.selectedCoin.name}</div>
                                <div className="fw-bold">{info.selectedCoin.symbol}</div>
                                <button type="button" className="btn-close ms-2" onClick={() => {updateIsOpenAddRecordsModal(false); updateIsOpenSearchCoinModal(true); updateSelectedCoin(null); updateIsBuy(false); updateIsSell(false); updateIsFollow(false)}}/>
                            </div>
                            <div className="wrapper">
                                <div className="d-flex column justify-content-around p-2" style={{backgroundColor: 'rgba(0, 0, 0, 8%)', borderRadius: '10px', height: '50px'}}>
                                    {isBuy ?
                                        <button className="type-transaction-button-active">Buy</button>
                                        :
                                        <button className="type-transaction-button" onClick={() => {updateIsBuy(true); updateIsSell(false); updateIsFollow(false)}}>Buy</button>
                                    }

                                    {isSell ?
                                        <button className="type-transaction-button-active">Sell</button>
                                        :
                                        <button className="type-transaction-button" onClick={() => {updateIsBuy(false); updateIsSell(true);  updateIsFollow(false)}}>Sell</button>
                                    }
                                    {!isFollowExist ?
                                        isFollow ?
                                            <button className="type-transaction-button-active">Follow</button>
                                            :
                                            <button className="type-transaction-button" onClick={() => {updateIsBuy(false); updateIsSell(false); updateIsFollow(true)}}>Follow</button>
                                        :
                                        <></>
                                    }
                                </div>
                                {!isFollow &&
                                    <>
                                        <div className="p-2">
                                            <div>Amount</div>
                                            <div className="d-flex column align-items-center">
                                                <input type='number' min="0" value={amount} onChange={(e) => setAmount(parseInt(e.target.value))} placeholder="0" className="inputSearch w-75"/>
                                                <div className="ms-3">{info.selectedCoin.symbol}</div>
                                            </div>
                                        </div>
                                        <div className="p-2">
                                            <div>Market Price</div>
                                            <div className="d-flex column align-items-center">
                                                <input type='number' min="0" value={marketPrice} onChange={(e) => setMarketPrice(parseInt(e.target.value))} placeholder="0" className="inputSearch w-75"/>
                                                <div className="ms-3">USD</div>
                                            </div>
                                        </div>
                                        <div className="p-2">
                                            <div>Date</div>
                                            <div className="d-flex">
                                                <input type='date' value={transactionDate} max={maxTransactionDate} onChange={(e) => {setTransactionDate(e.target.value);}} className="inputSearch w-50"/>
                                                <input type="time" value={transactionTime} className="inputSearch ms-4" onChange={(e) => {setTransactionTime(e.target.value);}}/>
                                            </div>
                                        </div>
                                        <div className="p-2">
                                            <div>Note</div>
                                            <div className="d-flex">
                                                <textarea maxLength="500" value={note} onChange={(e) => {setNote(e.target.value)}} className="inputNote w-100"/>
                                            </div>
                                        </div>
                                        <div className="d-flex column justify-content-start">
                                            <div className="text-primary">Total:</div>
                                            <div className="ms-2">{total}</div>
                                        </div>
                                    </>
                                }
                                <div className="w-100 text-center mt-3">
                                    <button className="btn btn-primary w-25" onClick={() => {AddTransactionHandler()}}>Add</button>
                                </div>
                            </div>
                        </div>
                    </>
                    :
                    <>
                        <div className="text-center mt-4 mb-4">
                            <LoginLoader />
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    const info = state.authModalReducer;
    return { info };
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {fetchSearchCoins, updateIsOpenAddRecordsModal, updateSelectedCoin, fetchGetCoinHistory, fetchAddPortfolioRecords, updateIsOpenSearchCoinModal, fetchGetPortfolios},
        dispatch
    );
export const ModalAddRecord = connect(
    mapStateToProps,
    mapDispatchToProps
)(ModalAddRecordLayout);