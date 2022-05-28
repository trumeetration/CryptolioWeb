import React from "react";
import {
    fetchRecoverTransaction,
    updateIsOpenConfirmationModal, updateRemoveType, updateSelectedTransactionForRemove
} from "../../store/actions/authModalActions";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

export const TransactionLayout = ({info, recordsData, updateIsOpenConfirmationModal, updateSelectedTransactionForRemove, updateRemoveType, fetchRecoverTransaction}) => {
    const optionsDate = { year: 'numeric', month: 'long', day: 'numeric' };
    const optionsTime = { hour: 'numeric', minute: 'numeric' };
    return (
        <>
            <div className="d-flex justify-content-end" style={{background: 'rgba(0,0,0,10%)', marginLeft: '10%'}}>
                <div className="rowTransaction w-100">
                    <div className="columnTransaction fw-bold font-monospace">
                        Amount
                    </div>
                    <div className="columnTransaction fw-bold font-monospace">
                        Buy Price
                    </div>
                    <div className="columnTransactionDate fw-bold font-monospace">
                        Date
                    </div>
                    <div className="columnTransaction fw-bold font-monospace">
                        Notes
                    </div>
                    <div className="columnTransaction fw-bold font-monospace">

                    </div>
                </div>
            </div>
            {recordsData
                .filter((obj) => { if (obj.recordType !== 'follow') return obj} )
                .length !== 0 ?
                recordsData
                .filter((obj) => { if (obj.recordType !== 'follow') return obj} )
                .map((el) => {
                let date = new Date(el.txTime);
                return (
                    <div className="d-flex justify-content-end">
                        <div className="rowTransaction w-100" style={{marginLeft: '10%'}}>
                            <div className="columnTransaction font-monospace" style={{color: 'rgb(22 163 74)'}}>
                                {el.recordType === 'buy' ?
                                    <p>+{el.amount}</p>
                                    :
                                    el.recordType === 'sell' ?
                                        <p>-{el.amount}</p>
                                        :
                                        <p>{el.amount}</p>
                                }
                            </div>
                            <div className="columnTransaction font-monospace">
                                {el.txPrice}
                            </div>
                            <div className="columnTransactionDate font-monospace">
                                <div>{date.toLocaleDateString('ru', optionsDate)}</div>
                                <div>{date.toLocaleTimeString('ru', optionsTime)}</div>
                            </div>
                            <div className="columnTransaction font-monospace">
                                {el.notes}
                            </div>
                            {info.isTrashOpen &&
                                <div className="columnTransactionButton font-monospace">
                                    <button className="btn btn-outline-secondary" onClick={() => {fetchRecoverTransaction(el.id)}}>B</button>
                                </div>
                            }
                            <div className="columnTransactionButton font-monospace">
                                <button className="btn btn-outline-secondary" onClick={() => {updateRemoveType('transaction'); updateSelectedTransactionForRemove(el); updateIsOpenConfirmationModal(true)}}>-</button>
                            </div>
                        </div>
                    </div>
                )
            })
            :
                <div className="h5 text-center">Пусто((</div>
            }
            <div className="headTableRecords" style={{background: 'rgba(0,0,0,10%)'}}>
                <div className="columnTableHeadAsset columnTableAsset font-monospace fw-bold">
                    Asset
                    <span className="arrow-down">
                        	&#9660;
                    </span>
                </div>
                <div className="columnTableHeadRecords columnTableAmount font-monospace fw-bold">
                    Amount
                    <span className="arrow-down">
                        	&#9660;
                    </span>
                </div>
                <div className="columnTableHeadRecords columnTableBuyPrice font-monospace fw-bold">
                    Avg Price
                    <span className="arrow-down">
                        	&#9660;
                    </span>
                </div>
                <div className="columnTableHeadRecords columnTablePrice font-monospace fw-bold">
                    Market Price
                    <span className="arrow-down">
                        	&#9660;
                    </span>
                </div>
                <div className="columnTableHeadRecords columnTableTotal font-monospace fw-bold">
                    Total
                    <span className="arrow-down">
                        	&#9660;
                    </span>
                </div>
                <div className="columnButton">

                </div>
                <div className="columnButton">

                </div>
            </div>
        </>
    )
}

const mapStateToProps = (state) => {
    const info = state.authModalReducer;
    return { info };
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {updateIsOpenConfirmationModal, updateSelectedTransactionForRemove, updateRemoveType, fetchRecoverTransaction},
        dispatch
    );
export const Transaction = connect(
    mapStateToProps,
    mapDispatchToProps
)(TransactionLayout);