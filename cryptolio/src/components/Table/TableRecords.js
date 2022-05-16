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
            <div className="headTableRecords" style={{background: 'rgba(0,0,0,10%)'}}>
                <div className="columnTableHeadAsset columnTableAsset font-monospace fw-bold">
                    Asset
                    <span className="arrow-down">
                        	&#9660;
                    </span>
                </div>
                <div className="columnTableHeadRecords columnTableAmount font-monospace fw-bold">
                    Amount
                    <span className="arrow-down">
                        	&#9660;
                    </span>
                </div>
                <div className="columnTableHeadRecords columnTableBuyPrice font-monospace fw-bold">
                    Avg Price
                    <span className="arrow-down">
                        	&#9660;
                    </span>
                </div>
                <div className="columnTableHeadRecords columnTablePrice font-monospace fw-bold">
                    Market Price
                    <span className="arrow-down">
                        	&#9660;
                    </span>
                </div>
                <div className="columnTableHeadRecords columnTableTotal font-monospace fw-bold">
                    Total
                    <span className="arrow-down">
                        	&#9660;
                    </span>
                </div>
                <div className="columnButton">

                </div>
                <div className="columnButton">

                </div>
            </div>
            {info.isPortfolioRecordsListLoading ?
                <div className="text-center rounded-3 pt-5 pb-5"><LoginLoader/></div>
            :
                info.portfolioRecordsList &&
                    (Object.keys(info.portfolioRecordsList)
                        .map((el) => {
                            return (info.portfolioRecordsList[el]
                                .filter((obj) => {if (obj.status === 'live' && obj.recordType !== 'follow') return obj })
                            ).length !== 0 &&
                                <RowRecords recordsData={info.portfolioRecordsList[el]} coinName={el}/>
                        }))
                        //.length === 0 && <div className="h4">Пусто((</div>

                        /*Object.keys(info.portfolioRecordsList)
                            .map((key) => {
                            return (<RowRecords recordsData={info.portfolioRecordsList[key]} coinName={key}/>)
                        })*/
                    /*:
                        <div className="h4">Пусто((</div>*/
            }
            {/*size === 0 && <div className="h4">Пусто((</div>*/}
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