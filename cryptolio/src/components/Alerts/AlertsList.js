import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {removeGlobalAlert} from "../../store/actions/activePageActions";
import {Alert} from "./Alert";



const AlertLayout = ({ info, removeGlobalAlert }) => {
    return (
        <div>
            <div className="toast-container position-absolute top-0 end-0 p-3 mt-5">
                {info.globalAlertList.map((alert) => (
                    <Alert
                        id={alert.id}
                        header={alert.header}
                        body={alert.body}
                        removeFun={removeGlobalAlert}
                    />
                ))}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    const info = state.activePageReducer;
    return { info };
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            removeGlobalAlert,
        },
        dispatch
    );
export const Alerts = connect(
    mapStateToProps,
    mapDispatchToProps
)(AlertLayout);