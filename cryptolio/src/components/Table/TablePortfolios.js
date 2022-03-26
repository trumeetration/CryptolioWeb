import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
const TablePortfoliosLayout = ({info}) => {
    return (
        <>
        </>
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