import React from "react";
import {bindActionCreators} from "redux";
import {
    fetchRemoveCoinWithTransaction,
    fetchRemoveTransaction, setTotalPortfolioPrice,
    updateIsOpenConfirmationModal,
} from "../../store/actions/authModalActions";
import {connect} from "react-redux";

const ModalRemoveConfirmationLayout = ({info, updateIsOpenConfirmationModal, fetchRemoveTransaction, fetchRemoveCoinWithTransaction, setTotalPortfolioPrice}) => {
    return (
        <div className="modal">
            <div className="my-modal" style={{width: 400, maxHeight: '100%'}}>
                {info.removeType === 'transaction' &&
                    <>
                        <div className="header-modal mb-4">
                            <div></div>
                            <div className="h5">Удалить транзакцию?</div>
                            <button type="button" className="btn-close" onClick={() => {updateIsOpenConfirmationModal(false)}}/>
                        </div>
                        <div className="body-modal">
                            <div className="d-flex column justify-content-around">
                                <button className="btn btn btn-primary w-25" onClick={() => {fetchRemoveTransaction(info.selectedTransactionForRemove); updateIsOpenConfirmationModal(false); setTotalPortfolioPrice(0)}}>Да</button>
                                <button className="btn btn btn-danger w-25" onClick={() => {updateIsOpenConfirmationModal(false)}}>Нет</button>
                            </div>
                        </div>
                    </>
                }
                {info.removeType === 'coin' &&
                    <>
                        <div className="header-modal mb-4">
                            <div></div>
                            <div className="h5">Удалить монету?</div>
                            <button type="button" className="btn-close" onClick={() => {updateIsOpenConfirmationModal(false)}}/>
                        </div>
                        <div className="body-modal">
                            <div className="d-flex column justify-content-around">
                                <button className="btn btn btn-primary w-25" onClick={() => {fetchRemoveCoinWithTransaction({portfolioId: info.portfolioList[info.selectedPortfolio].id, coinId: info.selectedCoinForRemove}); updateIsOpenConfirmationModal(false)}}>Да</button>
                                <button className="btn btn btn-danger w-25" onClick={() => {updateIsOpenConfirmationModal(false)}}>Нет</button>
                            </div>
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
        {updateIsOpenConfirmationModal, fetchRemoveTransaction, fetchRemoveCoinWithTransaction, setTotalPortfolioPrice},
        dispatch
    );
export const ModalRemoveConfirmation = connect(
    mapStateToProps,
    mapDispatchToProps
)(ModalRemoveConfirmationLayout);