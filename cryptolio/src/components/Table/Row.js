import React from "react";
import { MdFavoriteBorder } from "react-icons/md";
import { Sparklines, SparklinesLine } from 'react-sparklines';
import './styles.css';
import logo from './logo.jpg'

export const Row = ({id, coinData}) => {
    const data1 = [5, 10, 5, 20, 13, 20, 2, 15, 1, 5, 10, 5, 20, 13, 20, 2, 15, 10, 5, 10, 5, 20, 13, 20, 2, 15, 10];
    return (
            <div className="rowTable">
                <div className="columnTable favoriteTable font-monospace">
                    {id}
                </div>
                <div className="columnTable favoriteTable font-monospace">
                    <MdFavoriteBorder />
                </div>
                <div className="columnTableCurrencyName currency-name font-monospace">
                    <img src={logo} width={40} height={40} alt={"alt"} className="rounded-circle"/>
                    <div className="ms-3">${coinData.name}</div>
                </div>
                <div className="columnTable font-monospace">
                    {coinData.marketPrice}
                </div>
                <div className="columnTable font-monospace">
                    {coinData.priceChange24h}
                </div>
                <div className="columnTable font-monospace">
                    {coinData.priceChange7d}
                </div>
                <div className="columnTable font-monospace">
                    {coinData.marketCap}
                </div>
                <div className="chart-column " style={{backgroundColor: ''}}>
                    <div>
                        <div className="chart-wrapper" style={{backgroundColor: ''}}>
                            <Sparklines data={coinData.sparkleData} style={{width: '100%', height: 50}}>
                                <SparklinesLine color={coinData.sparkleData[0] < coinData.sparkleData[coinData.sparkleData.length -1] ? "green" : "red"}/>
                            </Sparklines>
                            <div id="gradient" />
                        </div>
                    </div>
                </div>
            </div>
    )
}