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
import {TextInput} from "../../UI/Inputs/textInput";
import {PasswordInput} from "../../UI/Inputs/passwordInput";

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
            {info.modalMode === "login" ?
                <div className="my-modal" style={{width: 300}}>
                    <div className="header-modal mb-4">
                        <div className="h5">Login</div>
                        <button type="button" className="btn-close" onClick={() => updateIsLoginModalVisible(false)}/>
                    </div>
                    <div className="body-modal">
                        <TextInput label="Email" onTextChange={setEmailLog} styles={{marginBottom: 15}}/>
                        <PasswordInput label="Password" onTextChange={setPasswordLog}/>
                        {info.requestLoginError && <DangerAlert />}
                        {info.updateIsLoginLoading ?
                        <div className="d-flex justify-content-center mt-3">
                            <LoginLoader />
                        </div> :
                        <div className="btn btn-primary mt-3 w-100" onClick={()=>loginHandler()}>
                            Login
                        </div>
                        }
                        <div className="d-flex justify-content-center">
                            <Link className="my-link mt-2 mb-0 pb-0" onClick={()=>updateModalMode("registration")}>
                                Create account
                            </Link>
                        </div>
                    </div>
                </div> :
                <div className="my-modal">
                    <div className="header-modal mb-4">
                        <div className="h5">Create account</div>
                        <button type="button" className="btn-close" onClick={() => {updateIsLoginModalVisible(false); updateModalMode("login")}}/>
                    </div>
                    <div className="body-modal">
                        <TextInput label="Login" onTextChange={setLoginReg} styles={{marginBottom: 15}}/>
                        <TextInput label="Email" onTextChange={setEmailReg} styles={{marginBottom: 15}}/>
                        <PasswordInput label="Password" onTextChange={setPasswordReg} styles={{marginBottom: 15}}/>
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
                            <Link className="my-link mt-2 mb-0 pb-0" onClick={()=>updateModalMode("login")}>
                                I already have an account
                            </Link>
                        </div>
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