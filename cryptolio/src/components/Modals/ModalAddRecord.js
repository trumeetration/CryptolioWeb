import React, {useEffect, useRef, useState} from "react";
import {TextInput} from "../../UI/Inputs/textInput";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {searchDelay} from "../../Hooks/searchDelay";
import {fetchSearchCoins} from "../../store/actions/authModalActions";
import {LoginLoader} from "../../UI/Loaders/loginLoader";
import './stylesModalAddRecords.css';

const ModalAddRecordLayout = ({info, updateIsOpenAddRecordModal, fetchSearchCoins}) => {
    useEffect(() => {
        if (info.searchCoinList === null) fetchSearchCoins('');
    }, [])
    const [searchValue, updateSearchValue] = useState('');
    const [isSearchingModalVisible, updateIsSearchingModalVisible] = useState(true);
    const [selectedCoin, updateSelectedCoin] = useState(null);
    const [isBuy, updateIsBuy] = useState(false);
    const [isSell, updateIsSell] = useState(false);
    const [amount, setAmount] = useState(0);
    let filteredCoins = [];
    if (info.searchCoinList !== null) {
        filteredCoins = info.searchCoinList.filter(el => {
            return el.name.toLowerCase().includes(searchValue.toLowerCase())
        })
    }
    return (
        <div className="modal">
            <div className="my-modal" style={{width: 500, maxHeight: '100%'}}>
                {isSearchingModalVisible ?
                    <>
                        <div className="header-modal mb-4">
                            <div className="h5">Добавление в <span className="text-primary">{info.portfolioList[info.selectedPortfolio].portfolioName}</span></div>
                            <button type="button" className="btn-close" onClick={() => {updateIsOpenAddRecordModal(false)}}/>
                        </div>
                        <div className="body-modal">
                            <div className="d-flex align-items-center ms-4 me-4">
                                {/*<TextInput onTextChange={updateSearchValue} label="Coin"/>*/}
                                <div className="fw-bold me-2">Coin</div>
                                <input className="inputSearch w-100" onChange={(e) => updateSearchValue(e.target.value)}/>
                                {info.isDataListLoading &&
                                    <div className="align-self-end ms-2 mb-1"><LoginLoader styles={{width: '25px', height: '25px'}}/></div>
                                }
                            </div>
                            {<div className="wrapper navbar-nav-scroll">
                                {
                                    filteredCoins !== null && filteredCoins.slice(0, 10).map((el) => {
                                        return <div className="rowSearchCoin m-1" onClick={() => {updateIsSearchingModalVisible(false); updateSelectedCoin(el)}}>
                                            <div className="d-flex column align-items-center">
                                                <img src={el.large} style={{width: '35px', height: '35px'}}/>
                                                <div className="ms-3" style={{textOveflow: 'clip', textWrap: 'none'}}>{el.name}</div>
                                            </div>
                                            <div>{el.symbol}</div>
                                        </div>
                                    })
                                }
                            </div>}
                        </div>
                    </>
                    :
                    <>
                        <div className="header-modal mb-4">
                            <button className="backButton fw-bold" onClick={() => {updateIsSearchingModalVisible(true)}}>&#8592;</button>
                            <div className="h5">Добавление в <span className="text-primary">{info.portfolioList[info.selectedPortfolio].portfolioName}</span></div>
                            <button type="button" className="btn-close" onClick={() => {updateIsOpenAddRecordModal(false)}}/>
                        </div>
                        <div className="body-modal">
                            <div className="d-flex align-items-center ms-4 me-4">
                                <img src={selectedCoin.large} style={{width: '35px', height: '35px'}}/>
                                <div className="ms-2 me-2 fw-bold" style={{textOveflow: 'clip', textWrap: 'none'}}>{selectedCoin.name}</div>
                                <div className="fw-bold">{selectedCoin.symbol}</div>
                            </div>
                            <div className="wrapper">
                                <div className="d-flex column justify-content-around p-2" style={{backgroundColor: 'rgba(0, 0, 0, 8%)', borderRadius: '10px', height: '50px'}}>
                                    {isBuy ?
                                        <button className="type-transaction-button-active">Buy</button>
                                        :
                                        <button className="type-transaction-button" onClick={() => {updateIsBuy(true); updateIsSell(false)}}>Buy</button>}
                                    {isSell ?
                                        <button className="type-transaction-button-active">Sell</button>
                                        :
                                        <button className="type-transaction-button" onClick={() => {updateIsBuy(false); updateIsSell(true)}}>Sell</button>
                                    }
                                </div>
                                <div className="p-2">
                                    <div>Amount</div>
                                    <div className="d-flex column align-items-center">
                                        <input type='number' placeholder="0" className="inputSearch w-75"/>
                                        <div className="ms-3">{selectedCoin.symbol}</div>
                                    </div>
                                </div>
                                <div className="p-2">
                                    <div>Market Price</div>
                                    <div className="d-flex column align-items-center">
                                        <input type='number' placeholder="0" className="inputSearch w-75"/>
                                        <div className="ms-3">USD</div>
                                    </div>
                                </div>
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
        {fetchSearchCoins},
        dispatch
    );
export const ModalAddRecord = connect(
    mapStateToProps,
    mapDispatchToProps
)(ModalAddRecordLayout);