import React, {useEffect, useState} from "react"
import {TableRecords} from "../components/Table/TableRecords";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {
    fetchAddPortfolio,
    fetchGetPortfolioRecords,
    fetchGetPortfolios,
    updateSelectedPortfolio
} from "../store/actions/authModalActions";
import "./portfoliosStyles.css"
import {ModalEditPortfolio} from "../components/Modals/ModalEditPortfolio";
import {ModalAddRecord} from "../components/Modals/ModalAddRecord";
import {TextInput} from "../UI/Inputs/textInput";
import {LoginLoader} from "../UI/Loaders/loginLoader";

export const PortfoliosPageLayout = ({info, fetchGetPortfolios, fetchGetPortfolioRecords, updateSelectedPortfolio, fetchAddPortfolio}) => {
    useEffect(() => {
        fetchGetPortfolios();
        updateIsOpenAddRecordModal(false);
        updateIsOpenEditModal(false);
        updateSelectedPortfolioEdit(null);
    }, [])
    const [IsOpenEditModal, updateIsOpenEditModal] = useState(false);                           //состояние модального окна редактирования портфолио
    const [IsOpenAddRecordModal, updateIsOpenAddRecordModal] = useState(false);                 //состояние модального окна добавления записи
    const [selectedPortfolioEdit, updateSelectedPortfolioEdit] = useState(null);                //id портфолио для редактирвоания
    const [isAddPortfolioButtonVisible, updateIsAddPortfolioButtonVisible] = useState(true);    //видимость кнопки добавления портфолио
    const [nameAddedPortfolio, setNameAddedPortfolio] = useState('');
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
    //console.log(info.portfolioList);
    return (
        <div>
            {IsOpenAddRecordModal && <ModalAddRecord updateIsOpenAddRecordModal={updateIsOpenAddRecordModal}/>}
            {IsOpenEditModal && <ModalEditPortfolio updateIsOpenEditModal={updateIsOpenEditModal} updateSelectedPortfolioEdit={updateSelectedPortfolioEdit} id={selectedPortfolioEdit}/>}
            {info.isAuth && info.portfolioList ?
                <div className="container d-flex flex-row">
                    <div className="w-25 h5">
                        Выбор портфолио
                        <div className="dropdown mt-3" id="myDropdown">
                            <button className="btn btn-outline-primary dropdown-toggle w-75 text-start" type="button" id="dropdownMenuButton1"
                                    data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
                                {info.selectedPortfolio !==null ?
                                <span className="h6 pe-1">{info.portfolioList[info.selectedPortfolio].portfolioName}</span>
                                :
                                "Выберите портфолио"}
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuClickableInside">
                                {info.portfolioList ? info.portfolioList.map((row, id) => {
                                    return (<li className="d-flex justify-content-center align-items-center" style={{width: 240}}>
                                        <div className="dropdown-item" onClick={() => {updateSelectedPortfolio(id);
                                            fetchGetPortfolioRecords(info.portfolioList[id].id);
                                            //console.log(info.portfolioList);
                                        }}>
                                            <div className="d-flex justify-content-between align-items-center h6">
                                                {info.portfolioList[id].portfolioName}
                                                <div className="button-edit ps-2 pe-2 pb-2 text-center" onClick={() => {updateIsOpenEditModal(true); updateSelectedPortfolioEdit(id)}}>...</div>
                                            </div>
                                        </div>
                                    </li>)
                                }) : <div className="d-flex justify-content-center mt-5">Пусто(</div>}
                                <li>
                                    <hr className="dropdown-divider"/>
                                </li>
                                <div className="d-flex justify-content-center align-items-center ps-3 pe-3">
                                    {isAddPortfolioButtonVisible ?
                                        <button className="addPortfolioButton" onClick={() => {updateIsAddPortfolioButtonVisible(false)}}>
                                            Add portfolio
                                        </button>
                                        :
                                        info.isAddPortfolioLoading ?
                                                <LoginLoader/>
                                                :
                                        <div className="d-flex justify-content-center align-items-center" style={{transition: '1s'}}>
                                                <TextInput onTextChange={setNameAddedPortfolio} label={'Name'}/>
                                                <button className="addButton ms-2 mt-4" onClick={() => addPortfolioHandler()}>+</button>
                                        </div>
                                    }
                                </div>
                            </ul>
                        </div>
                    </div>
                    <div className="flex-row w-75">
                        <div className="d-flex justify-content-between">
                            <div className="column navbar-brand">
                                Транзакции
                            </div>
                            <button className="btn btn-outline-primary" onClick={() => updateIsOpenAddRecordModal(true)}>Добавить</button>
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
        {fetchGetPortfolios, fetchGetPortfolioRecords, updateSelectedPortfolio, fetchAddPortfolio},
        dispatch
    );
export const PortfoliosPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(PortfoliosPageLayout);