import React from "react";
import { MdFavoriteBorder } from "react-icons/md";
import { Sparklines, SparklinesLine } from 'react-sparklines';
import './styles.css';

export const Table = ({}) => {
    const data1 = [5, 10, 5, 20, 13, 20, 2, 15, 1, 5, 10, 5, 20, 13, 20, 2, 15, 10, 5, 10, 5, 20, 13, 20, 2, 15, 10];
    return (
        <div className="wrapper">
            <div className="rowTable">
                <div className="columnTable favoriteTable">
                    {1}
                </div>
                <div className="columnTable favoriteTable">
                    <MdFavoriteBorder />
                </div>
                <div className="columnTable favoriteTable">
                    <img width={40} height={40} alt={"alt"}/>
                </div>
                <div className="columnTable currency-name">
                    Bitcoin BTC
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
                <div className="columnTable">
                    <div className="chart-wrapper">
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