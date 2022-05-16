import React, {useEffect, useState} from "react"
import {TableRecords} from "../components/Table/TableRecords";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {
    fetchAddPortfolio,
    fetchGetPortfolioRecords,
    fetchGetPortfolios, fetchSearchCoins, updateIsOpenAddRecordsModal, updateIsOpenSearchCoinModal, updateSelectedCoin,
    updateSelectedPortfolio
} from "../store/actions/authModalActions";
import "./portfoliosStyles.css"
import {ModalEditPortfolio} from "../components/Modals/ModalEditPortfolio";
import {ModalAddRecord} from "../components/Modals/ModalAddRecord";
import {TextInput} from "../UI/Inputs/textInput";
import {LoginLoader} from "../UI/Loaders/loginLoader";
import {ModalSearchCoin} from "../components/Modals/ModalSearchCoin";
import {ModalRemoveConfirmation} from "../components/Modals/ModalRemoveConfirmation";

export const PortfoliosPageLayout = ({info, fetchGetPortfolios, fetchGetPortfolioRecords, updateSelectedPortfolio, fetchAddPortfolio, updateIsOpenAddRecordsModal, fetchSearchCoins, updateSelectedCoin, updateIsOpenSearchCoinModal}) => {
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
    //const [IsOpenAddRecordModal, updateIsOpenAddRecordModal] = useState(false);                 //состояние модального окна добавления записи
    const [selectedPortfolioEdit, updateSelectedPortfolioEdit] = useState(null);                //id портфолио для редактирвоания
    const [isAddPortfolioButtonVisible, updateIsAddPortfolioButtonVisible] = useState(true);    //видимость кнопки добавления портфолио
    const [nameAddedPortfolio, setNameAddedPortfolio] = useState('');
    let filteredPortfolios = [];
    if (info.portfolioList !== null && info.isAuth === true) {
        filteredPortfolios = info.portfolioList.sort(function(a, b) {
            return a.id - b.id;
        });
    }
    if (document.getElementById('myDropdown') !== null) {
        let myDropdown = document.getElementById('myDropdown')
        myDropdown.addEventListener('hidden.bs.dropdown', function () {
            updateIsAddPortfolioButtonVisible(true);
        })
    }
    const addPortfolioHandler = () => {
        if (nameAddedPortfolio.trim() !== '') {
            fetchAddPortfolio(nameAddedPortfolio);
            setNameAddedPortfolio('');
        }
    }
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
                            Выбор портфолио
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
                                        <button className="addButton ms-2 mt-4" onClick={() => {addPortfolioHandler(); updateIsAddPortfolioButtonVisible(true);}}>+</button>
                                    </div>
                            }
                        </div>
                    </div>
                    <div className="flex-row w-75">
                        <div className="d-flex justify-content-between">
                            <div className="column navbar-brand">
                                Транзакции
                            </div>
                            {info.selectedPortfolio !== null &&
                                <button className="btn btn-outline-primary" onClick={() => {updateSelectedCoin(null); updateIsOpenSearchCoinModal(true)}}>Добавить</button>
                            }
                        </div>
                        {<TableRecords />}
                    </div>
                </div>
                :
                <div className="d-flex justify-content-center">
                    <div className="h1">
                        Вы не авторизованы!
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
        {fetchGetPortfolios, fetchGetPortfolioRecords, updateSelectedPortfolio, fetchAddPortfolio, updateIsOpenAddRecordsModal, fetchSearchCoins, updateSelectedCoin, updateIsOpenSearchCoinModal},
        dispatch
    );
export const PortfoliosPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(PortfoliosPageLayout);