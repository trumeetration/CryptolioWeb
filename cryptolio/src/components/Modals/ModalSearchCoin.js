import React, {useState} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {LoginLoader} from "../../UI/Loaders/loginLoader";
import {
    updateIsOpenAddRecordsModal,
    updateIsOpenSearchCoinModal,
    updateSelectedCoin
} from "../../store/actions/authModalActions";

const ModalSearchCoinLayout = ({info, updateIsOpenSearchCoinModal, updateSelectedCoin, updateIsOpenAddRecordsModal}) => {
    const [searchValue, updateSearchValue] = useState('');
    let filteredCoins = [];
    if (info.searchCoinList !== null) {
        filteredCoins = info.searchCoinList.filter(el => {
            return el.name.toLowerCase().includes(searchValue.toLowerCase())
        })
    }
    return (
        <div className="modal">
            <div className="my-modal" style={{width: 500, maxHeight: '100%'}}>
                <div className="header-modal mb-4">
                    <div></div>
                    <div className="h5">Добавление в <span className="text-primary">{info.portfolioList[info.selectedPortfolio].portfolioName}</span></div>
                    <button type="button" className="btn-close" onClick={() => {updateIsOpenSearchCoinModal(false)}}/>
                </div>
                <div className="body-modal">
                    <div className="d-flex align-items-center ms-4 me-4">
                        <div className="fw-bold me-2">Coin</div>
                        <input className="inputSearch w-100" onChange={(e) => updateSearchValue(e.target.value)}/>
                        {info.isDataListLoading &&
                            <div className="align-self-end ms-2 mb-1"><LoginLoader styles={{width: '25px', height: '25px'}}/></div>
                        }
                    </div>
                    <div className="wrapper navbar-nav-scroll">
                        {
                            filteredCoins !== null && filteredCoins.slice(0, 10).map((el) => {
                                return <div className="rowSearchCoin m-1" onClick={() => {updateSelectedCoin(el); updateIsOpenSearchCoinModal(false); updateIsOpenAddRecordsModal(true)/*isFollowCheck(el); SetMaxTransaction()*/}}>
                                    <div className="d-flex column align-items-center">
                                        <img src={el.large} style={{width: '35px', height: '35px'}}/>
                                        <div className="ms-3" style={{textOverflow: 'clip', textWrap: 'none'}}>{el.name}</div>
                                    </div>
                                    <div>{el.symbol}</div>
                                </div>
                            })
                        }
                    </div>
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
        {updateIsOpenSearchCoinModal, updateSelectedCoin, updateIsOpenAddRecordsModal},
        dispatch
    );
export const ModalSearchCoin = connect(
    mapStateToProps,
    mapDispatchToProps
)(ModalSearchCoinLayout);