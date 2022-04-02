import React, {useEffect} from "react";
import {Table} from "../components/Table/Table";
import {
    fetchGetCoins, updateCurrentCoinsListPage,
} from "../store/actions/authModalActions";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

const MarketLayout = ({info, fetchGetCoins, updateCurrentCoinsListPage}) => {
    useEffect(() => {
        (info.coinsList === null && setTimeout(fetchGetCoins(info.currentCoinsListPage, 1000)));
    },[]);
    const updatePageHandler = (page) => {
        if (!info.isCoinsListLoading) {
            updateCurrentCoinsListPage(page);
            fetchGetCoins(page)
        }
    }
    return (
        <div className="container flex-row">
            <div className="d-flex justify-content-between">
                <div className="column navbar-brand">
                    Market
                </div>
                <form className="d-flex">
                    <input className="form-control me-2" type="search" placeholder="Search"
                           aria-label="Search"/>
                    <button className="btn btn-outline-success" type="submit">Search</button>
                </form>
            </div>
            <Table coinsList={info.coinsList}/>
            <ul className="pagination column justify-content-start">
                {info.currentCoinsListPage > 4 ?
                    <li className="page-item">
                        <a className="page-link" onClick={() => updatePageHandler(info.currentCoinsListPage - 1)} aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                    :
                    <li className="page-item">
                        <a className="page-link" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                }

                {info.currentCoinsListPage > 4 &&
                    <>
                        <li className="page-item"><a className="page-link" onClick={() => updatePageHandler(1)}>1</a></li>
                        <li className="page-item"><a className="page-link">...</a></li>
                    </>
                }
                {(info.currentCoinsListPage - 3 > 0 && info.currentCoinsListPage < 5) &&
                    <li className="page-item"><a className="page-link" onClick={() => updatePageHandler(info.currentCoinsListPage - 3)}>{info.currentCoinsListPage - 3}</a>
                    </li>
                }
                {(info.currentCoinsListPage - 2 > 0) &&
                    <li className="page-item"><a className="page-link" onClick={() => updatePageHandler(info.currentCoinsListPage - 2)}>{info.currentCoinsListPage - 2}</a>
                    </li>
                }
                {(info.currentCoinsListPage - 1 > 0) &&
                    <li className="page-item"><a className="page-link" onClick={() => updatePageHandler(info.currentCoinsListPage - 1)}>{info.currentCoinsListPage - 1}</a>
                    </li>
                }
                <li className="page-item"><a className="page-link bg-primary text-white">{info.currentCoinsListPage}</a></li>

                {info.currentCoinsListPage + 1 < Math.ceil(info.coinsListSize/100) + 1 &&
                    <li className="page-item"><a className="page-link" onClick={() => updatePageHandler(info.currentCoinsListPage + 1)}>{info.currentCoinsListPage + 1}</a>
                    </li>
                }
                {info.currentCoinsListPage + 2 < Math.ceil(info.coinsListSize/100) + 1 &&
                    <li className="page-item"><a className="page-link" onClick={() => updatePageHandler(info.currentCoinsListPage + 2)}>{info.currentCoinsListPage + 2}</a>
                    </li>
                }
                {(info.currentCoinsListPage + 3 < Math.ceil(info.coinsListSize/100) + 1 && info.currentCoinsListPage + 4 > Math.ceil(info.coinsListSize/100)) &&
                    <li className="page-item"><a className="page-link" onClick={() => updatePageHandler(info.currentCoinsListPage + 3)}>{info.currentCoinsListPage + 3}</a>
                    </li>
                }

                {info.currentCoinsListPage < Math.ceil(info.coinsListSize/100) - 3  ?
                    <>
                        <li className="page-item"><a className="page-link">...</a></li>
                        <li className="page-item"><a className="page-link" onClick={() => updatePageHandler(Math.ceil(info.coinsListSize/100))}>{Math.ceil(info.coinsListSize/100)}</a></li>
                    </>
                    :
                    <>
                    </>
                }

                {info.currentCoinsListPage < Math.ceil(info.coinsListSize/100) ?
                    <li className="page-item">
                        <a className="page-link" onClick={() => updatePageHandler(info.currentCoinsListPage + 1)} aria-label="Previous">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                    :
                    <li className="page-item">
                        <a className="page-link" aria-label="Previous">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                }
            </ul>
        </div>
    )
}

const mapStateToProps = (state) => {
    const info = state.authModalReducer;
    return { info };
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {fetchGetCoins, updateCurrentCoinsListPage},
        dispatch
    );
export const MarketPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(MarketLayout);
