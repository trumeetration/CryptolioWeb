import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import "./stylesPortfolios.css"
import {MdFavoriteBorder} from "react-icons/md";
import {Row} from "./Row";
import {LoginLoader} from "../../UI/Loaders/loginLoader";
const TablePortfoliosLayout = ({info}) => {
    return (
        <div className="wrapper">
            <div className="headTable">
                <div className="columnTableHeadAsset currency-name font-monospace">
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
                    24h Profit
                    <span className="arrow-down">
                        	&#9660;
                    </span>
                </div>
                <div className="columnTableHead font-monospace">
                    All Time Anal
                    <span className="arrow-down">
                        	&#9660;
                    </span>
                </div>
                <div className="columnTableHead font-monospace">
                    Avg price
                    <span className="arrow-down">
                        	&#9660;
                    </span>
                </div>
                <div className="columnTableHead font-monospace">
                    Holdings
                    <span className="arrow-down">
                        	&#9660;
                    </span>
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
export const TablePortfolios = connect(
    mapStateToProps,
    mapDispatchToProps
)(TablePortfoliosLayout);