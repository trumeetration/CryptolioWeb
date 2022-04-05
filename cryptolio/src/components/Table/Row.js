import React from "react";
import { MdFavoriteBorder } from "react-icons/md";
import { Sparklines, SparklinesLine } from 'react-sparklines';
import './styles.css';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {LoginLoader} from "../../UI/Loaders/loginLoader";

const RowLayout = ({info, id, coinData}) => {
    return (
        <div className="rowTable text-center">
            {info.isCoinsListLoading ?
                <div className="text-center"><LoginLoader /></div>
                :
                <>
                    <div className="favoriteTable font-monospace">
                        {id}
                    </div>
                    <div className="favoriteTable font-monospace">
                        <MdFavoriteBorder />
                    </div>
                    <div className="columnTableAsset currency-name font-monospace">
                        <img src={coinData.image} width={35} height={35} alt={"alt"} className="rounded-circle"/>
                        <div className="ms-3">{coinData.name}</div>
                    </div>
                    <div className="columnTable font-monospace text-primary">
                        ${coinData.marketPrice}
                    </div>
                    <div className={`columnTable font-monospace ${(coinData.priceChange24h > 0) ? "text-success-light" : (coinData.priceChange24h < 0) ? "text-danger" : ""}`}>
                        {coinData.priceChange24h}%
                    </div>
                    <div className={`columnTable font-monospace ${(coinData.priceChange7d > 0) ? "text-success-light" : (coinData.priceChange7d < 0) ? "text-danger" : ""}`}>
                        {coinData.priceChange7d}%
                    </div>
                    <div className="columnTable font-monospace">
                        {(coinData.marketCap > 1000000000) ?
                            "$"+(coinData.marketCap/1000000000).toFixed(2)+"B"
                            :
                            (coinData.marketCap > 1000000) ?
                                "$"+(coinData.marketCap/1000000).toFixed(2)+"M"
                                :
                                "$"+coinData.marketCap

                        }
                    </div>
                    <div className="chart-column " style={{backgroundColor: ''}}>
                        <div>
                            <div className="chart-wrapper" style={{backgroundColor: ''}}>
                                <Sparklines data={coinData.sparkleData} style={{width: '100%', height: 50}}>
                                    <SparklinesLine color={coinData.sparkleData[0] < coinData.sparkleData[coinData.sparkleData.length -1] ? "green"
                                        : (coinData.sparkleData[0] > coinData.sparkleData[coinData.sparkleData.length -1]) ? "red"
                                            :"grey"}/>
                                </Sparklines>
                            </div>
                        </div>
                    </div>
                </>
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
        {},
        dispatch
    );
export const Row = connect(
    mapStateToProps,
    mapDispatchToProps
)(RowLayout);