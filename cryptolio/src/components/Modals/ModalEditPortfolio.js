import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import './styles.css';
import {TextInput} from "../../UI/Inputs/textInput";

const ModalEditPortfolioLayout = ({info, updateIsOpenEditModal, updateSelectedPortfolioEdit, id}) => {
    return (
        <div className="modal">
            <div className="my-modal" style={{width: 300}}>
                <div className="header-modal mb-4">
                    <div className="h5">Edit</div>
                    <button type="button" className="btn-close" onClick={() => {updateIsOpenEditModal(false); updateSelectedPortfolioEdit(null)}}/>
                </div>
                <div className="body-modal">
                    <TextInput label="Name" oldText={info.portfolioList[id].portfolioName} styles={{marginBottom: 15}}/>
                    <button className="btn btn-primary mt-3 text-nowrap w-100">Сохранить</button>
                    <button className="btn btn-outline-danger mt-3 text-nowrap w-100">Удалить</button>
                </div>
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
        {},
        dispatch
    );
export const ModalEditPortfolio = connect(
    mapStateToProps,
    mapDispatchToProps
)(ModalEditPortfolioLayout);