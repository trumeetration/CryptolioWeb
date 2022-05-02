import React, {useEffect, useState} from "react";
import './stylesTableRecords.css';
import './stylesTransactions.css';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {LoginLoader} from "../../UI/Loaders/loginLoader";
import {fetchGetCoinsData} from "../../store/actions/authModalActions";
import {Transaction} from "./Transaction";

const RowRecordsLayout = ({info, recordsData}) => {
    useEffect(() => {
        updateIsTransactionsVisible(false);
    },[]);
    const [isTransactionsVisible, updateIsTransactionsVisible] = useState(false);
    let finalAmount = 0;
    let avgBuyPrice = 0;
    return (
        <div>
            <div className="rowTableRecords">
                <div className="columnTableAssetRecords columnTableAsset font-monospace">
                    <img src={recordsData[0].image} width={35} height={35} alt={"alt"} className="rounded-circle"/>
                    <span className="fw-bold ms-2 me-2">{recordsData[0].name}</span>
                    <span className="fw-bold">{recordsData[0].symbol.toUpperCase()}</span>
                </div>
                <div className="columnTableRecords columnTableAmount font-monospace">
                    {recordsData.map((el) => {
                        finalAmount += el.amount;
                    })}
                    {finalAmount}
                </div>
                <div className="columnTableRecords columnTableBuyPrice font-monospace">
                    {recordsData.map((el) => {
                        avgBuyPrice += el.buyPrice;
                    })}
                    {(avgBuyPrice/recordsData.length).toLocaleString('en', { style: 'currency', currency: 'USD'})}
                </div>
                <div className="columnTableRecords columnTablePrice font-monospace">
                    {recordsData[0].marketPrice.toLocaleString('en', { style: 'currency', currency: 'USD'})}
                </div>
                <div className="columnTableRecords columnTableTotal font-monospace">
                    {(recordsData[0].amount * recordsData[0].marketPrice).toLocaleString('en', { style: 'currency', currency: 'USD'})}
                </div>
                <div className="columnButton d-flex justify-content-center">
                    <button className="btn btn-outline-secondary w-50" onClick={() => updateIsTransactionsVisible(!isTransactionsVisible)}>
                        &#128269;
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
        {fetchGetCoinsData},
        dispatch
    );
export const RowRecords = connect(
    mapStateToProps,
    mapDispatchToProps
)(RowRecordsLayout);