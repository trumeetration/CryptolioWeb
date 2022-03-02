import React from "react";
import { MdFavoriteBorder } from "react-icons/md";
import { Sparklines, SparklinesLine } from 'react-sparklines';
import './styles.css';
import logo from './logo.jpg'

export const Table = ({}) => {
    const data1 = [5, 10, 5, 20, 13, 20, 2, 15, 1, 5, 10, 5, 20, 13, 20, 2, 15, 10, 5, 10, 5, 20, 13, 20, 2, 15, 10];
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
                <div className="columnTable font-monospace">
                    24h Volume
                </div>
                <div className="chart-column font-monospace">
                    7d Graph
                </div>
            </div>
            <div className="rowTable">
                <div className="columnTable favoriteTable font-monospace">
                    1
                </div>
                <div className="columnTable favoriteTable font-monospace">
                    <MdFavoriteBorder />
                </div>
                <div className="columnTableCurrencyName currency-name font-monospace">
                    <img src={logo} width={40} height={40} alt={"alt"} className="rounded-circle"/>
                    <div className="ms-3">Rangocoin RNC</div>
                </div>
                <div className="columnTable font-monospace">
                    111
                </div>
                <div className="columnTable font-monospace">
                    222
                </div>
                <div className="columnTable font-monospace">
                    333
                </div>
                <div className="columnTable font-monospace">
                    444
                </div>
                <div className="columnTable font-monospace">
                    555
                </div>
                <div className="chart-column " style={{backgroundColor: ''}}>
                    <div>
                        <div className="chart-wrapper" style={{backgroundColor: ''}}>
                            <Sparklines data={data1} style={{width: '100%', height: 50}}>
                                <SparklinesLine color="green"/>
                            </Sparklines>
                            <div id="gradient" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}