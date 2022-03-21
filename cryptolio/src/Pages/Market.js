import React, {useEffect} from "react";
import {Table} from "../components/Table/Table"
import {
    fetchGetCoins,
} from "../store/actions/authModalActions";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

const MarketLayout = ({fetchGetCoins, info}) => {
    useEffect(() => {
        fetchGetCoins()
    },[]);
    console.log(info.coinsList);
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
        </div>
    )
}

const mapStateToProps = (state) => {
    const info = state.authModalReducer;
    return { info };
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {fetchGetCoins},
        dispatch
    );
export const MarketPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(MarketLayout);
