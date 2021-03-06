import React, {useState} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import './styles.css';
import {TextInput} from "../../UI/Inputs/textInput";
import {fetchDeletePortfolio, fetchEditPortfolio, fetchGetPortfolios} from "../../store/actions/authModalActions";

const ModalEditPortfolioLayout = ({info, updateIsOpenEditModal, updateSelectedPortfolioEdit, id, fetchEditPortfolio, fetchDeletePortfolio}) => {
    const [newNamePortfolio, setNewNamePortfolio] = useState('');
    const [isConfirmationVisible, updateIsConfirmationVisible] = useState(false);
    const editPortfolioHandler = () => {
        if (newNamePortfolio.trim() !== '') {
            fetchEditPortfolio(info.portfolioList[id].id, newNamePortfolio);
            setNewNamePortfolio('');
        }
    }
    return (
        <div className="modal">
            <div className="my-modal" style={{width: 300}}>
                <div className="header-modal mb-4">
                    <div className="d-flex column tempName">
                        <div className="h5">Edit</div>
                        <div className="text-primary overflow-hidden h5 ms-2">{info.portfolioList[id].portfolioName}</div>
                    </div>
                    <button type="button" className="btn-close" onClick={() => {updateIsOpenEditModal(false); updateSelectedPortfolioEdit(null); updateIsConfirmationVisible(false)}}/>
                </div>
                <div className="body-modal">
                    <TextInput label="Name" onTextChange={setNewNamePortfolio} oldText={info.portfolioList[id].portfolioName} styles={{marginBottom: 15}}/>
                    <button className="btn btn-primary mt-3 text-nowrap w-100" onClick={() => {editPortfolioHandler(); updateIsOpenEditModal(false)}}>Save</button>
                    {isConfirmationVisible ?
                        <div className="mt-3">
                            <div className="text-center font-monospace">
                                Are you sure?
                            </div>
                            <div className="d-flex column justify-content-around">
                                <button className="btn btn-outline-primary mt-2 text-nowrap" onClick={() => {updateIsConfirmationVisible(false)}} style={{width: '40%'}}>No</button>
                                <button className="btn btn-outline-danger mt-2 text-nowrap " onClick={() => {fetchDeletePortfolio(info.portfolioList[id].id); updateSelectedPortfolioEdit(null); updateIsOpenEditModal(false);}} style={{width: '40%'}}>Yes</button>
                            </div>
                        </div>
                        :
                        <button className="btn btn-outline-danger mt-3 text-nowrap w-100" onClick={() => {updateIsConfirmationVisible(true)}}>Delete</button>
                    }
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
        { fetchEditPortfolio, fetchDeletePortfolio},
        dispatch
    );
export const ModalEditPortfolio = connect(
    mapStateToProps,
    mapDispatchToProps
)(ModalEditPortfolioLayout);