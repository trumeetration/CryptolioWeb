import React from "react";

export const Transaction = ({recordsData}) => {
    const optionsDate = { year: 'numeric', month: 'long', day: 'numeric' };
    const optionsTime = { hour: 'numeric', minute: 'numeric' };
    return (
        <>
            <div className="d-flex justify-content-end" style={{background: 'rgba(0,0,0,10%)', marginLeft: '10%'}}>
                <div className="rowTransaction w-100">
                    <div className="columnTransaction fw-bold font-monospace">
                        Amount
                    </div>
                    <div className="columnTransaction fw-bold font-monospace">
                        Buy Price
                    </div>
                    <div className="columnTransactionDate fw-bold font-monospace">
                        Date
                    </div>
                    <div className="columnTransaction fw-bold font-monospace">
                        Notes
                    </div>
                </div>
            </div>
            {recordsData.map((el) => {
                let date = new Date(el.buyTime);
                return (
                    <div className="d-flex justify-content-end">
                        <div className="rowTransaction w-100" style={{marginLeft: '10%'}}>
                            <div className="columnTransaction font-monospace" style={{color: 'rgb(22 163 74)'}}>
                                {el.amount}
                            </div>
                            <div className="columnTransaction font-monospace">
                                {el.buyPrice}
                            </div>
                            <div className="columnTransactionDate font-monospace">
                                <div>{date.toLocaleDateString('ru', optionsDate)}</div>
                                <div>{date.toLocaleTimeString('ru', optionsTime)}</div>
                            </div>
                            <div className="columnTransaction font-monospace">
                                {el.notes}
                            </div>
                        </div>
                    </div>
                )
            })}
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
            </div>
        </>
    )
}