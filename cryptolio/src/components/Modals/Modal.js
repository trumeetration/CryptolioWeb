import React from "react";
import './styles.css';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {
    fetchCreateToken,
    setEmailLog,
    setEmailReg,
    setLoginLog,
    setLoginReg,
    setPasswordLog,
    setPasswordReg,
    updateModalMode
} from "../../store/actions/authModalActions";
import {Link} from "react-router-dom";
import {DangerAlert} from "../../UI/Alerts/dangerAlert";
import {LoginLoader} from "../../UI/Loaders/loginLoader";
import {updateIsLoginModalVisible} from "../../store/actions/activePageActions";
import {AuthInputLayout} from "../Inputs/Auth/AuthInput";

const ModalLayout = ({info, setLoginReg, setEmailReg, setPasswordReg, setLoginLog, setEmailLog, setPasswordLog, updateModalMode, fetchCreateToken, updateIsLoginModalVisible}) => {
    console.log(info);
    const loginHandler = () => {
        let isError = false;
        if (info.logLogin.trim()) {
            isError = true;
        }
        if (info.logPassword.trim()) {
            isError = true;
        }
        if (isError) {
            fetchCreateToken(info.logLogin, info.logPassword);
        }
    }
    return (
        <div className="modal">
            {info.modalMode == "login" ?
                <div className="content-modal">
                    <div className="header-modal mb-4">
                        <div className="navbar-brand d-flex justify-content-center">Login</div>
                        <Link className="nav-link text-secondary p-0 m-0" onClick={() => updateIsLoginModalVisible(false)}>Закрыть</Link>
                    </div>
                    <div className="d-flex flex-column justify-content-end mb-3">
                        <div className="modal-input-header">Email</div>
                        <input type="text" className="modal-input" defaultValue={info.logEmail} onChange={(e)=>setEmailLog(e.target.value)}/>
                    </div>
                    <div className="d-flex flex-column mb-3">
                        <div className="modal-input-header">Password</div>
                        <input type="password" className="modal-input" defaultValue={info.logPassword} onChange={(e)=>setPasswordLog(e.target.value)}/>
                    </div>
                    {info.requestLoginError && <DangerAlert />}
                    {info.updateIsLoginLoading ?
                        <div className="d-flex justify-content-center">
                            <LoginLoader />
                        </div> :
                        <div className="btn btn-primary" onClick={()=>loginHandler()}>
                            Login
                        </div>
                    }
                    <div className="d-flex justify-content-center">
                        <Link className="nav-link mb-0 pb-0" onClick={()=>updateModalMode("registration")}>
                            Create account
                        </Link>
                    </div>
                </div> :
                <div className="content-modal">
                    <div className="header-modal mb-4">
                        <div className="navbar-brand d-flex justify-content-center">Create account</div>
                        <Link className="nav-link text-secondary p-0 m-0" onClick={() => {updateIsLoginModalVisible(false); updateModalMode("login")}}>Закрыть</Link>
                    </div>
                    <div className="d-flex flex-column justify-content-end mb-3">
                        <div className="modal-input-header">Login</div>
                        <input type="text" className="modal-input" defaultValue={info.regLogin} onChange={(e)=>setLoginReg(e.target.value)}/>
                    </div>
                    <div className="d-flex flex-column justify-content-end mb-3">
                        <div className="modal-input-header">Email</div>
                        <input type="email" className="modal-input" defaultValue={info.regEmail} onChange={(e)=>setEmailReg(e.target.value)}/>
                    </div>
                    <div className="d-flex flex-column mb-3">
                        <div className="modal-input-header">Password</div>
                        <input type="password" className="modal-input" defaultValue={info.regPassword} onChange={(e)=>setPasswordReg(e.target.value)}/>
                    </div>
                    {info.requestRegistrationError && <DangerAlert />}
                    {info.updateIsRegistrationLoading ?
                        <div className="d-flex justify-content-center">
                            <LoginLoader />
                        </div> :
                        <div className="btn btn-primary" onClick={()=>loginHandler()}>
                            Registration
                        </div>
                    }
                    <div className="d-flex justify-content-center">
                        <Link className="nav-link mb-0 pb-0" onClick={()=>updateModalMode("login")}>
                            I already have an account
                        </Link>
                    </div>
                </div>
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    const info = state.authModalReducer;
    return { info };
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {setLoginReg, setEmailReg, setPasswordReg, setLoginLog, setEmailLog, setPasswordLog, updateModalMode, fetchCreateToken, updateIsLoginModalVisible},
        dispatch
    );
export const Modal = connect(
    mapStateToProps,
    mapDispatchToProps
)(ModalLayout);