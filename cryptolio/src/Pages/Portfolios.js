import React, {useEffect, useState} from "react"
import {TableRecords} from "../components/Table/TableRecords";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {
    fetchGetPortfolioRecords,
    fetchGetPortfolios,
    updateSelectedPortfolio
} from "../store/actions/authModalActions";
import "./portfoliosStyles.css"
import {ModalEditPortfolio} from "../components/Modals/ModalEditPortfolio";

export const PortfoliosPageLayout = ({info, fetchGetPortfolios, fetchGetPortfolioRecords, updateSelectedPortfolio}) => {
    useEffect(() => {
        fetchGetPortfolios();
        updateIsOpenEditModal(false);
        updateSelectedPortfolioEdit(null);
    }, [])
    const [IsOpenEditModal, updateIsOpenEditModal] = useState(false);               //состояние модального окна редактирования портфолио
    const [selectedPortfolioEdit, updateSelectedPortfolioEdit] = useState(null);    //id портфолио для редактирвоания
    //console.log("--->", info.portfolioList);
    return (
        <div>
            {IsOpenEditModal && <ModalEditPortfolio updateIsOpenEditModal={updateIsOpenEditModal} updateSelectedPortfolioEdit={updateSelectedPortfolioEdit} id={selectedPortfolioEdit}/>}
            {info.isAuth && info.portfolioList ?
                <div className="container d-flex flex-row">
                    <div className="w-25 h5">
                        Выбор портфолио
                        <div className="dropdown mt-3">
                            <button className="btn btn-outline-secondary dropdown-toggle w-75 text-start" type="button" id="dropdownMenuButton1"
                                    data-bs-toggle="dropdown" aria-expanded="false">
                                {info.selectedPortfolio !==null ?
                                <span className="h6 pe-1">{info.portfolioList[info.selectedPortfolio].portfolioName}</span>
                                :
                                "Выберите портфолио"}
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
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
                            </ul>
                        </div>
                    </div>
                    <div className="flex-row w-75">
                        <div className="d-flex justify-content-between">
                            <div className="column navbar-brand">
                                Your Assets
                            </div>
                        </div>
                        <TableRecords />
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
        {fetchGetPortfolios, fetchGetPortfolioRecords, updateSelectedPortfolio},
        dispatch
    );
export const PortfoliosPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(PortfoliosPageLayout);