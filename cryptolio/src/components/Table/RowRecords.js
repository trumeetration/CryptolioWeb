import React, {useEffect, useState} from "react";
import './stylesTableRecords.css';
import './stylesTransactions.css';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {LoginLoader} from "../../UI/Loaders/loginLoader";
import {
    fetchGetCoinsData,
    updateIsOpenAddRecordsModal,
    updateIsOpenConfirmationModal, updateRemoveType,
    updateSelectedCoin, updateSelectedCoinForRemove
} from "../../store/actions/authModalActions";
import {Transaction} from "./Transaction";

const RowRecordsLayout = ({info, recordsData, updateIsOpenAddRecordsModal, updateSelectedCoin, coinName, updateRemoveType, updateIsOpenConfirmationModal, updateSelectedCoinForRemove}) => {
    useEffect(() => {
        updateIsTransactionsVisible(false);
    },[]);
    const [isTransactionsVisible, updateIsTransactionsVisible] = useState(false);
    let finalAmount = 0;
    let avgPrice = 0;
    const searchCoin = (name) => {
        if (info.searchCoinList !== null) {
            info.searchCoinList.map((el) => {
                if (el.id === name) updateSelectedCoin(el);
            })
        }
    }
    //console.log(recordsData);
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
                        //.filter((obj) => { if (obj.status === 'live') return obj} )
                        .map((el) => {
                        finalAmount += el.amount;
                        avgPrice += el.txPrice;
                    })}
                    {finalAmount}
                </div>
                <div className="columnTableRecords columnTableBuyPrice font-monospace">
                    {recordsData
                        //.filter((obj) => { if (obj.status === 'live') return obj} )
                        .length > 0 ?
                        (avgPrice/recordsData
                            //.filter((obj) => { if (obj.status === 'live') return obj} )
                            .length).toLocaleString('en', { style: 'currency', currency: 'USD'})
                    :
                        recordsData
                            //.filter((obj) => { if (obj.status === 'live') return obj} )
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
        {fetchGetCoinsData, updateIsOpenAddRecordsModal, updateSelectedCoin, updateRemoveType, updateIsOpenConfirmationModal, updateSelectedCoinForRemove},
        dispatch
    );
export const RowRecords = connect(
    mapStateToProps,
    mapDispatchToProps
)(RowRecordsLayout);