import React, {useEffect, useState} from "react";
import './stylesTableRecords.css';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {LoginLoader} from "../../UI/Loaders/loginLoader";
import {fetchGetCoinsData} from "../../store/actions/authModalActions";

const RowRecordsLayout = ({info, recordsData}) => {
    useEffect(() => {
    },[]);
    //console.log("--->", data);
    return (
        <div className="rowTable text-center">
            <div className="columnTableAsset font-monospace">
                <img src={recordsData.image} width={35} height={35} alt={"alt"} className="rounded-circle"/>
                <span className="fw-bold ms-2 me-2">{recordsData.name}</span>
                <span className="fw-bold">{recordsData.symbol.toUpperCase()}</span>
            </div>
            <div className="columnTable font-monospace fw-bold">
                {recordsData.marketPrice}
            </div>
            <div className="columnTable font-monospace fw-bold">
                {recordsData.buyPrice}
            </div>
            <div className="columnTable font-monospace fw-bold">
                {recordsData.amount}
            </div>
            <div className="columnTable font-monospace fw-bold">
                {recordsData.buyTime}
            </div>
            <div className="columnTable font-monospace fw-bold">
                {recordsData.notes}
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
        {fetchGetCoinsData},
        dispatch
    );
export const RowRecords = connect(
    mapStateToProps,
    mapDispatchToProps
)(RowRecordsLayout);