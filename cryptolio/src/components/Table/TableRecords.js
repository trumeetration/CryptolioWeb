import React, {useEffect, useState} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import "./stylesTableRecords.css"
import {LoginLoader} from "../../UI/Loaders/loginLoader";
import {RowRecords} from "./RowRecords";
import {Row} from "./Row";
import {fetchGetCoinsData} from "../../store/actions/authModalActions";

const TableRecordsLayout = ({info}) => {
    useEffect(() => {
    },[])
    return (
        <div className="wrapper">
            <div className="headTable">
                <div className="columnTableHeadAsset font-monospace">
                    Asset
                    <span className="arrow-down">
                        	&#9660;
                    </span>
                </div>
                <div className="columnTableHead font-monospace">
                    Price
                    <span className="arrow-down">
                        	&#9660;
                    </span>
                </div>
                <div className="columnTableHead font-monospace">
                    Buy Price
                    <span className="arrow-down">
                        	&#9660;
                    </span>
                </div>
                <div className="columnTableHead font-monospace">
                    Amount
                    <span className="arrow-down">
                        	&#9660;
                    </span>
                </div>
                <div className="columnTableHead font-monospace">
                    Date
                    <span className="arrow-down">
                        	&#9660;
                    </span>
                </div>
                <div className="columnTableHead font-monospace">
                    Notes
                    <span className="arrow-down">
                        	&#9660;
                    </span>
                </div>
            </div>
            {info.isPortfolioRecordsListLoading ?
                <div className="gradient text-center rounded-3 bg-primary pt-5 pb-5"><LoginLoader/></div>
            :
                info.portfolioRecordsList &&
                    info.portfolioRecordsList.length !== 0 ?
                        info.portfolioRecordsList.map((row, id) => {
                        return (<RowRecords recordsData={row}/>)
                    })
                        :
                    <div className="h4">Пусто((</div>
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
        {fetchGetCoinsData},
        dispatch
    );
export const TableRecords = connect(
    mapStateToProps,
    mapDispatchToProps
)(TableRecordsLayout);