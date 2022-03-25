import React from "react";
import { MdFavoriteBorder } from "react-icons/md";
import { Sparklines, SparklinesLine } from 'react-sparklines';
import './styles.css';
import logo from './logo.jpg'
import {Row} from "./Row";
import {LoginLoader} from "../../UI/Loaders/loginLoader";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

const TableLayout = ({info, coinsList}) => {
    return (
        <div className="wrapper">
            <div className="headTable">
                <div className="columnTable favoriteTable font-monospace">
                    #
                </div>
                <div className="columnTable favoriteTable font-monospace">
                    <MdFavoriteBorder />
                </div>
                <div className="columnTableCurrencyName currency-name font-monospace">
                    Asset
                </div>
                <div className="columnTable font-monospace">
                    Market Price
                </div>
                <div className="columnTable font-monospace">
                    24h Change
                </div>
                <div className="columnTable font-monospace">
                    7d Change
                </div>
                <div className="columnTable font-monospace">
                    Market Cap
                </div>
                <div className="chart-column font-monospace">
                    7d Graph
                </div>
            </div>
            {coinsList ? coinsList.map((row, id) => {
                return (<Row id={(info.currentCoinsListPage - 1) * 100 + id + 1} coinData={row}/>)
            }) : <div className="d-flex justify-content-center mt-5"><LoginLoader /></div>}
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
export const Table = connect(
    mapStateToProps,
    mapDispatchToProps
)(TableLayout);