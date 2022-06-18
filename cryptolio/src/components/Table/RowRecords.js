import React, {useEffect, useState} from "react";
import './stylesTableRecords.css';
import './stylesTransactions.css';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {LoginLoader} from "../../UI/Loaders/loginLoader";
import {
    fetchGetCoinsData, setTotalPortfolioPrice,
    updateIsOpenAddRecordsModal,
    updateIsOpenConfirmationModal, updateRemoveType,
    updateSelectedCoin, updateSelectedCoinForRemove
} from "../../store/actions/authModalActions";
import {Transaction} from "./Transaction";

const RowRecordsLayout = ({info, recordsData, updateIsOpenAddRecordsModal, updateSelectedCoin, coinName,
                              updateRemoveType, updateIsOpenConfirmationModal, updateSelectedCoinForRemove, setTotalPortfolioPrice}) => {
    useEffect(() => {
        updateIsTransactionsVisible(false);
        let temp = 0;
        let avg = 0;
        let bCount = 0;
        for (let i = 0; i < recordsData.length; i++) {
            if (recordsData[i].recordType === 'buy') {
                temp += Number(recordsData[i].amount);
                bCount += 1;
                avg += Number(recordsData[i].txPrice);
            }
            else if (recordsData[i].recordType === 'sell') temp -= Number(recordsData[i].amount)
        }
        //setTotalPrice(temp * recordsData[0].marketPrice);
        setFinalAmount(temp);
        setAvgPrice(avg);
        setBuyCount(bCount);
    },[]);
    const [isTransactionsVisible, updateIsTransactionsVisible] = useState(false);
    const [finalAmount, setFinalAmount] = useState(0);
    const [avgPrice, setAvgPrice] = useState(0);
    const [buyCount, setBuyCount] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const searchCoin = (name) => {
        if (info.searchCoinList !== null) {
            info.searchCoinList.map((el) => {
                if (el.id === name) updateSelectedCoin(el);
            })
        }
    }
    useEffect(() => {
        //if (totalPrice !== 0)
        {
            //if (info.totalPortfolioPrice !== 0)
            {
                //console.log('-->', totalPrice);
                //let temp = info.totalPortfolioPrice;
                //console.log(temp, ' + ', totalPrice, ' = ' , temp + totalPrice)
                //setTotalPortfolioPrice(temp + totalPrice);
            }
            //else setTotalPortfolioPrice(totalPrice);
        }
    }, [totalPrice])
    useEffect(() => {
        console.log(info.totalPortfolioPrice)
    }, [info.totalPortfolioPrice])
    //console.log(recordsData);
    //console.log('avg :', avgPrice);
    return (
        <div>
            <div className="rowTableRecords">
                <div className="columnTableAssetRecords columnTableAsset font-monospace">
                    <img src={recordsData[0].image} width={35} height={35} alt={"alt"} className="rounded-circle"/>
                    <span className="fw-bold ms-2 me-2">{recordsData[0].name}</span>
                    <span className="fw-bold">{recordsData[0].symbol.toUpperCase()}</span>
                </div>
                <div className="columnTableRecords columnTableAmount font-monospace">
                    {recordsData
                        .map((el) => {
                        //avgPrice += el.txPrice;
                    })}
                    {finalAmount}
                </div>
                <div className="columnTableRecords columnTableBuyPrice font-monospace">
                    {recordsData
                        .length > 0 ?
                        (avgPrice/buyCount).toLocaleString('en', { style: 'currency', currency: 'USD'})
                    :
                        recordsData
                            .length.toLocaleString('en', { style: 'currency', currency: 'USD'})
                    }
                </div>
                <div className="columnTableRecords columnTablePrice font-monospace">
                    {recordsData[0].marketPrice.toLocaleString('en', { style: 'currency', currency: 'USD'})}
                </div>
                <div className="columnTableRecords columnTableTotal font-monospace">
                    {(finalAmount * recordsData[0].marketPrice).toLocaleString('en', { style: 'currency', currency: 'USD'})}
                </div>
                <div className="columnButton d-flex justify-content-center">
                    <button className="btn btn-outline-secondary" onClick={() => updateIsTransactionsVisible(!isTransactionsVisible)}>
                        \/
                    </button>
                </div>
                {!info.isTrashOpen &&
                    <div className="columnButton d-flex justify-content-center">
                        <button className="btn btn-outline-secondary" onClick={() => { searchCoin(coinName); updateIsOpenAddRecordsModal(true) }}>
                            +
                        </button>
                    </div>
                }
                <div className="columnButton d-flex justify-content-center">
                    <button className="btn btn-outline-secondary" onClick={() => { updateRemoveType('coin'); updateSelectedCoinForRemove(coinName); updateIsOpenConfirmationModal(true) }}>
                        -
                    </button>
                </div>
            </div>
            {isTransactionsVisible &&
                <Transaction recordsData={recordsData} />
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    const info = state.authModalReducer;
    return { info };
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {fetchGetCoinsData, updateIsOpenAddRecordsModal, updateSelectedCoin,
            updateRemoveType, updateIsOpenConfirmationModal, updateSelectedCoinForRemove, setTotalPortfolioPrice},
        dispatch
    );
export const RowRecords = connect(
    mapStateToProps,
    mapDispatchToProps
)(RowRecordsLayout);