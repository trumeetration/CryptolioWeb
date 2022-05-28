import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import React, {useEffect, useState} from "react";
import {
    fetchGetCoinInfo,
    fetchGetCoinPriceByInterval,
    updateIsCoinInfoVisible,
    updateSelectedCoin
} from "../../store/actions/authModalActions";
import {LoginLoader} from "../../UI/Loaders/loginLoader";
import Chart from "react-apexcharts";
import "./coinInfoStyles.css"

const ModalCoinInfoLayout = ({info, updateSelectedCoin, fetchGetCoinInfo, updateIsCoinInfoVisible, fetchGetCoinPriceByInterval}) => {
    useEffect(() => {
        if (info.coinInfo === null) {
            fetchGetCoinInfo(info.selectedCoin.coinId);
        }
        else if (info.selectedCoin.coinId !== info.coinInfo.id) {
            fetchGetCoinInfo(info.selectedCoin.coinId);
        }
        //console.log(info.selectedCoin)
        let today = new Date();
        let endTime = today.getTime() / 1000;
        let startTime = new Date().setDate(today.getDate() - timeInterval) / 1000;
        fetchGetCoinPriceByInterval({ id: info.selectedCoin.coinId, startTime: startTime, endTime: endTime});
    },[info.selectedCoin])
    useEffect(() => {
        //chartHandler();
    },[info.coinInfo])
    const [priceArr, setPriceArr] = useState([]);
    const [volumeArr, setVolumeArr] = useState([]);
    const [marketCapArr, setMarketCapArr] = useState([]);
    const [dateArr, setDateArr] = useState([]);
    const [timeInterval, setTimeInterval] = useState(1);
    /*const chartHandler = () => {
        if (info.coinInfo !== null)
        {
            info.coinInfo.sparkline.map((el) => {
                parseInt(el);
            });
            //setPriceArr(info.coinInfo.sparkline);
            let tempArr = [];
        }
    }*/
    useEffect(() => {
        if (info.chartsInfo !== null) {
            let tempArr = [];
            let tempTimeArr = [];
            info.chartsInfo.market_caps.map((el) => {
                /*if (new Date(el[0]).getDate() > tempTimeArr[tempTimeArr.length - 1])*/ tempTimeArr.push(new Date(el[0]).toLocaleString());
                //else tempTimeArr.push(new Date(el[0]).toLocaleTimeString());
                tempArr.push(el[1]);
            })
            setMarketCapArr(tempArr);
            setDateArr(tempTimeArr);
            tempTimeArr = [];
            tempArr = [];
            info.chartsInfo.prices.map((el) => {
                tempArr.push(el[1]);
            })
            setPriceArr(tempArr);
            tempArr = [];
            info.chartsInfo.total_volumes.map((el) => {
                tempArr.push(el[1]);
            })
            setVolumeArr(tempArr);
            tempArr = [];
        }
    }, [info.chartsInfo])
    useEffect(() => {
        let today = new Date();
        let endTime = today.getTime() / 1000;
        let startTime = 0;
        if (timeInterval !== 0) startTime = new Date().setDate(today.getDate() - timeInterval) / 1000;
        else startTime = 0;
        fetchGetCoinPriceByInterval({ id: info.selectedCoin.coinId, startTime: startTime, endTime: endTime});
    }, [timeInterval])
    //console.log(priceArr)
    return (
        <>
            <div className="modal">
                <div className="my-modal" style={{width: '90%', height: '90%'}}>
                    <div className="header-modal mb-4">
                        <div></div>
                        <div className="h5"><span className="text-primary">Information</span></div>
                        <button type="button" className="btn-close" onClick={() => {updateIsCoinInfoVisible(false); updateSelectedCoin(null)}}/>
                    </div>
                    <div className="body-modal" style={{overflowY: 'scroll'}}>
                        {!info.isCoinInfoLoading ?
                            <div className="wrapper">
                                <div className="d-flex column justify-content-center align-content-start">
                                    <div className="d-flex row align-content-start" style={{width: '70%'}}>
                                        <div className="d-flex column">
                                            <div className="">
                                                <img src={info.coinInfo.image.large} alt="..." style={{width: '40px', height: '40px'}}/>
                                            </div>
                                            <div className="fs-4 ms-2">
                                                <span className="">{info.coinInfo.name}</span>
                                            </div>
                                            <div className="fs-5 ms-2 pt-1">
                                                <span className="text-secondary">{info.coinInfo.symbol.toUpperCase()}</span>
                                            </div>
                                        </div>
                                        <div className="d-flex column justify-content-center">
                                            <button className="my-btn my-btn-left" onClick={() => setTimeInterval(1)}>24h</button>
                                            <button className="my-btn" onClick={() => setTimeInterval(7)}>7d</button>
                                            <button className="my-btn" onClick={() => setTimeInterval(14)}>14d</button>
                                            <button className="my-btn my-btn-right" onClick={() => setTimeInterval(30)}>30d</button>
                                            {/*<button className="btn btn-outline-secondary" onClick={() => setTimeInterval(0)}>Max</button>*/}
                                        </div>
                                        {info.isChartsInfoLoading ?
                                            <div className="d-flex justify-content-center align-items-center h-100">
                                                <LoginLoader />
                                            </div>
                                            :
                                            <div className="app">
                                                <div className="row">
                                                    <div className="mixed-chart">
                                                        <Chart
                                                            options={{
                                                                chart: {
                                                                    id: "basic-bar"
                                                                },
                                                                xaxis: {
                                                                    categories: dateArr
                                                                }
                                                            }}
                                                            series={[
                                                                {
                                                                    name: "Price",
                                                                    data: priceArr
                                                                }
                                                            ]}
                                                            type="line"
                                                            width="90%"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                    <div className="d-flex row align-content-start overflow-hidden" style={{width: '35%'}}>
                                        <div className="fs-4 fw-bold">{info.coinInfo.symbol.toUpperCase()} Statistic:</div>
                                        <div className="fs-5 d-flex justify-content-between">
                                            <div className="w-50">Price</div>
                                            <div className="text-secondary">{info.coinInfo.marketPrice.toLocaleString('en', { style: 'currency', currency: 'USD'})}</div>
                                        </div>
                                        <div className="fs-5 d-flex justify-content-between">
                                            <div className="w-50">Market Cap</div>
                                            <div className="text-secondary w-50 text-end">{info.coinInfo.marketCap.toLocaleString('en', { style: 'currency', currency: 'USD'})}</div>
                                        </div>
                                        <div className="fs-5 d-flex justify-content-between">
                                            <div className="w-50">Market Cap Rank</div>
                                            <div className="text-secondary w-50 text-end">#{info.coinInfo.marketCapRank}</div>
                                        </div>
                                        <div className="fs-5 d-flex justify-content-between">
                                            <div className="w-50">24h low</div>
                                            <div className="text-secondary w-50 text-end">{info.coinInfo.low24h.toLocaleString('en', { style: 'currency', currency: 'USD'})}</div>
                                        </div>
                                        <div className="fs-5 d-flex justify-content-between">
                                            <div className="w-50">24h high</div>
                                            <div className="text-secondary w-50 text-end">{info.coinInfo.high24h.toLocaleString('en', { style: 'currency', currency: 'USD'})}</div>
                                        </div>
                                        <div className="fs-5 d-flex justify-content-between">
                                            <div className="w-50">All-Time High</div>
                                            <div className="d-flex column justify-content-between w-50">
                                                <div className="text-secondary me-2">{info.coinInfo.ath.toLocaleString('en', { style: 'currency', currency: 'USD'})}</div>
                                                {info.coinInfo.athPercentage > 0 ?
                                                    <div className="text-success">{(info.coinInfo.athPercentage / 100).toLocaleString('en', { style: 'percent' })}</div>
                                                    :
                                                    <div className="text-danger">{(info.coinInfo.athPercentage / 100).toLocaleString('en', { style: 'percent'})}</div>
                                                }
                                            </div>
                                        </div>
                                        <div className="fs-5 d-flex justify-content-between">
                                            <div className="w-50">All-Time Low</div>
                                            <div className="d-flex column justify-content-between w-50">
                                                <div className="text-secondary me-2">{info.coinInfo.atl.toLocaleString('en', { style: 'currency', currency: 'USD'})}</div>
                                                {info.coinInfo.atlPercentage > 0 ?
                                                    <div className="text-success">{(info.coinInfo.atlPercentage / 100).toLocaleString('en', { style: 'percent' })}</div>
                                                    :
                                                    <div className="text-danger">{(info.coinInfo.atlPercentage / 100).toLocaleString('en', { style: 'percent' })}</div>
                                                }
                                            </div>
                                        </div>
                                        <div className="fs-5 d-flex justify-content-between">
                                            <div className="w-50">Volume / Market Cap</div>
                                            <div className="text-secondary w-50 text-end">{(info.coinInfo.totalVolume / info.coinInfo.marketCap)/*.toFixed(4)*/}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            :
                            <div className="text-center"><LoginLoader /></div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = (state) => {
    const info = state.authModalReducer;
    return { info };
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {updateSelectedCoin, fetchGetCoinInfo, updateIsCoinInfoVisible, fetchGetCoinPriceByInterval},
        dispatch
    );
export const ModalCoinInfo = connect(
    mapStateToProps,
    mapDispatchToProps
)(ModalCoinInfoLayout);