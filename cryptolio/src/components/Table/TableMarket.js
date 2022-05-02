import React from "react";
import { MdFavoriteBorder } from "react-icons/md";
import { Sparklines, SparklinesLine } from 'react-sparklines';
import './styles.css';
import logo from './logo.jpg'
import {Row} from "./Row";
import {LoginLoader} from "../../UI/Loaders/loginLoader";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

const TableMarketLayout = ({info, coinsList}) => {
    return (
        <div className="wrapper">
            <div className="headTable">
                <div className="columnTableHeadNumber favoriteTable font-monospace">
                    #
                    <span className="arrow-down">
                        	&#9660;
                    </span>
                </div>
                <div className="columnTableHeadFavorite favoriteTable font-monospace">
                    <MdFavoriteBorder />
                    <span className="arrow-down">
                        	&#9660;
                    </span>
                </div>
                <div className="columnTableHeadAsset currency-name font-monospace">
                    Asset
                    <span className="arrow-down">
                        	&#9660;
                    </span>
                </div>
                <div className="columnTableHead font-monospace">
                    Market Price
                    <span className="arrow-down">
                        	&#9660;
                    </span>
                </div>
                <div className="columnTableHead font-monospace">
                    24h Change
                    <span className="arrow-down">
                        	&#9660;
                    </span>
                </div>
                <div className="columnTableHead font-monospace">
                    7d Change
                    <span className="arrow-down">
                        	&#9660;
                    </span>
                </div>
                <div className="columnTableHead font-monospace">
                    Market Cap
                    <span className="arrow-down">
                        	&#9660;
                    </span>
                </div>
                <div className="chart-columnHead font-monospace">
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
export const TableMarket = connect(
    mapStateToProps,
    mapDispatchToProps
)(TableMarketLayout);