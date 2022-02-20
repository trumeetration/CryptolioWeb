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
                <div className="columnTable favoriteTable font-monospace" style={{width: 30}}>
                    #
                </div>
                <div className="columnTable favoriteTable font-monospace">
                    <MdFavoriteBorder />
                </div>
                <div className="columnTable currency-name font-monospace">
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
                <div className="columnTable font-monospace" style={{width: 150}}>
                    7d Graph
                </div>
            </div>
            <div className="rowTable">
                <div className="columnTable favoriteTable">
                    {1}
                </div>
                <div className="columnTable favoriteTable">
                    <MdFavoriteBorder />
                </div>
                <div className="columnTable currency-name d-flex flex-row align-items-center">
                    <img src={logo} width={40} height={40} alt={"alt"}/>
                    <div className="ms-3">Bitcoin BTC</div>
                </div>
                <div className="columnTable">
                    $42,265.04
                </div>
                <div className="columnTable">
                    0.86%
                </div>
                <div className="columnTable">
                    4.36%
                </div>
                <div className="columnTable">
                    $965 B
                </div>
                <div className="columnTable">
                    $34 B
                </div>
                <div className="columnTable" style={{backgroundColor: ''}}>
                    <div className="chart-wrapper" style={{backgroundColor: ''}}>
                        <Sparklines data={data1} style={{width: 150, height: 50}}>
                            <SparklinesLine color="green"/>
                        </Sparklines>
                        <div id="gradient" />
                    </div>
                </div>
            </div>
        </div>
    )
}