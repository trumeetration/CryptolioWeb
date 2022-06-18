import React, {useEffect, useState} from "react"
import {TableRecords} from "../components/Table/TableRecords";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {
    fetchAddPortfolio,
    fetchGetPortfolioRecords,
    fetchGetPortfolios,
    fetchSearchCoins, setTotalPortfolioPrice,
    updateIsOpenAddRecordsModal,
    updateIsOpenSearchCoinModal,
    updateIsTrashOpen,
    updateSelectedCoin,
    updateSelectedPortfolio
} from "../store/actions/authModalActions";
import "./portfoliosStyles.css"
import {ModalEditPortfolio} from "../components/Modals/ModalEditPortfolio";
import {ModalAddRecord} from "../components/Modals/ModalAddRecord";
import {TextInput} from "../UI/Inputs/textInput";
import {LoginLoader} from "../UI/Loaders/loginLoader";
import {ModalSearchCoin} from "../components/Modals/ModalSearchCoin";
import {ModalRemoveConfirmation} from "../components/Modals/ModalRemoveConfirmation";

export const PortfoliosPageLayout = ({info, fetchGetPortfolios, fetchGetPortfolioRecords, updateSelectedPortfolio,
                                         fetchAddPortfolio, updateIsOpenAddRecordsModal, fetchSearchCoins, updateSelectedCoin,
                                         updateIsOpenSearchCoinModal, updateIsTrashOpen, setTotalPortfolioPrice}) => {
    useEffect(() => {
        fetchGetPortfolios();
        updateIsOpenAddRecordsModal(false);
        updateIsOpenEditModal(false);
        updateSelectedPortfolioEdit(null);
        fetchSearchCoins('');
    }, [])
    useEffect(() => {
        if (info.isAuth !== false) fetchGetPortfolios();
    }, [info.isAuth])
    const [IsOpenEditModal, updateIsOpenEditModal] = useState(false);                           //состояние модального окна редактирования портфолио
    const [selectedPortfolioEdit, updateSelectedPortfolioEdit] = useState(null);                //id портфолио для редактирвоания
    const [isAddPortfolioButtonVisible, updateIsAddPortfolioButtonVisible] = useState(true);    //видимость кнопки добавления портфолио
    const [nameAddedPortfolio, setNameAddedPortfolio] = useState('');
    const [totalPrice, setTotalPrice] = useState(0);
    let totalPriceTemp = 0;
    let filteredPortfolios = [];
    if (info.portfolioList !== null && info.isAuth === true) {
        filteredPortfolios = info.portfolioList.sort(function(a, b) {
            return a.id - b.id;
        });
    }
    const addPortfolioHandler = () => {
        if (nameAddedPortfolio.trim() !== '') {
            fetchAddPortfolio(nameAddedPortfolio);
            setNameAddedPortfolio('');
        }
    }

    const sumTotal = (txList) => {
        let amount = 0;
        //let avg = 0;
        //let bCount = 0;
        for (let i = 0; i < txList.length; i++) {
            if (txList[i].recordType === 'buy') {
                amount += Number(txList[i].amount);
            }
            else if (txList[i].recordType === 'sell') amount -= Number(txList[i].amount)
        }
        totalPriceTemp += (amount * txList[0].marketPrice);
        setTotalPrice(totalPriceTemp);
    }

    useEffect(() => {
        setTotalPrice(0);
        if (info.portfolioRecordsList !== null) {
            if (!info.isTrashOpen) {
                Object.keys(info.portfolioRecordsList)
                    .map((el) => {
                        if ((info.portfolioRecordsList[el]
                                .filter((obj) => {
                                    if (obj.status === 'live') return obj;
                                })
                        ).length !== 0) {
                            sumTotal(info.portfolioRecordsList[el]);
                        }
                })
            }
            else {
                Object.keys(info.portfolioRecordsList)
                    .map((el) => {
                        if ((info.portfolioRecordsList[el]
                                .filter((obj) => {
                                    if (obj.status === 'trash') return obj;
                                })
                        ).length !== 0) {
                            sumTotal(info.portfolioRecordsList[el]);
                        }
                    })
            }
        }

    }, [info.portfolioRecordsList, info.isTrashOpen])
    return (
        <div>
            {info.isOpenConfirmationModal && <ModalRemoveConfirmation />}
            {info.isOpenSearchCoinModal && <ModalSearchCoin />}
            {info.isOpenAddRecordsModal && <ModalAddRecord />}
            {IsOpenEditModal && <ModalEditPortfolio updateIsOpenEditModal={updateIsOpenEditModal} updateSelectedPortfolioEdit={updateSelectedPortfolioEdit} id={selectedPortfolioEdit}/>}
            {info.isAuth && info.portfolioList ?
                <div className="container d-flex column">
                    <div className="w-25">
                        <div className="h5">
                            Portfolio selection
                        </div>
                        {info.portfolioList ? filteredPortfolios.map((row, id) => {
                            return (
                                info.selectedPortfolio === id ?
                                    <div className="portfoliosRowSelected w-75 d-flex column align-items-center">
                                        <div className="w-75 ps-2 overflow-hidden" onClick={() => {updateSelectedPortfolio(id);
                                            fetchGetPortfolioRecords(info.portfolioList[id].id);
                                        }}>
                                            {info.portfolioList[id].portfolioName}
                                        </div>
                                        <div className="button-edit w-25 h-100 align-bottom text-center pt-3" onClick={() => {updateIsOpenEditModal(true); updateSelectedPortfolioEdit(id)}}>
                                            ...
                                        </div>
                                    </div>
                                    :
                                    <div className="portfoliosRow w-75 d-flex column align-items-center">
                                        <div className="w-75 ps-2 overflow-hidden" onClick={() => {updateSelectedPortfolio(id);
                                            fetchGetPortfolioRecords(info.portfolioList[id].id);
                                        }}>
                                            {info.portfolioList[id].portfolioName}
                                        </div>
                                        <div className="button-edit w-25 h-100 align-bottom text-center pt-3" onClick={() => {updateIsOpenEditModal(true); updateSelectedPortfolioEdit(id)}}>
                                            ...
                                        </div>
                                    </div>
                            )
                            })
                            : <div className="d-flex justify-content-center mt-5">Пусто(</div>}
                        <div className="mt-3">
                            {isAddPortfolioButtonVisible ?
                                <button className="addPortfolioButton" onClick={() => {updateIsAddPortfolioButtonVisible(false)}}>
                                    Add portfolio
                                </button>
                                :
                                info.isAddPortfolioLoading ?
                                    <LoginLoader/>
                                    :
                                    <div className="d-flex justify-content-center align-items-center w-75" style={{transition: '1s'}}>
                                        <TextInput onTextChange={setNameAddedPortfolio} label={'Name'}/>
                                        <button className="addButton ms-2 mt-4 w-25" onClick={() => {addPortfolioHandler(); updateIsAddPortfolioButtonVisible(true);}}>{nameAddedPortfolio.trim() !== '' ? <>+</> : <>x</>}</button>
                                    </div>
                            }
                        </div>
                    </div>
                    <div className="flex-row w-75">
                        <div className="d-flex column justify-content-start m-3">
                            <div className="infoTable d-flex column justify-content-center p-3">
                                <div className="me-1">Total: </div>
                                <div>${totalPrice}
                                </div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between">
                            <div className="text-center align-self-center h4 ms-3">{info.isTrashOpen ? <>Trash</> : <>Transactions</>}</div>
                            <div className="d-flex column justify-content-center w-100">
                                <button className="btn btn-primary column navbar-brand" onClick={() => {updateIsTrashOpen(false); setTotalPortfolioPrice(0)}}>
                                    Transactions
                                </button>
                                <button className="btn btn-primary column navbar-brand" onClick={() => {updateIsTrashOpen(true); setTotalPortfolioPrice(0)}}>
                                    Trash
                                </button>
                            </div>
                            {info.selectedPortfolio !== null &&
                                <button className="btn btn-outline-primary" onClick={() => {updateSelectedCoin(null); updateIsOpenSearchCoinModal(true)}}>
                                    Add
                                </button>
                            }
                        </div>
                        {<TableRecords/>}
                    </div>
                </div>
                :
                <div className="d-flex justify-content-center">
                    <div className="h1">
                        You are not authorized!
                    </div>
                </div>
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
        {fetchGetPortfolios, fetchGetPortfolioRecords, updateSelectedPortfolio, fetchAddPortfolio,
            updateIsOpenAddRecordsModal, fetchSearchCoins, updateSelectedCoin, updateIsOpenSearchCoinModal,
            updateIsTrashOpen, setTotalPortfolioPrice},
        dispatch
    );
export const PortfoliosPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(PortfoliosPageLayout);