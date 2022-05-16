import React, {useState} from "react";
import './styles.css';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {
    fetchCreateToken,
    fetchRegistration,
    setEmailLog,
    setLoginLog,
    setPasswordLog,
    updateIsLoginModalVisible,
    updateModalMode
} from "../../store/actions/authModalActions";
import {Link} from "react-router-dom";
import {DangerAlert} from "../../UI/Alerts/dangerAlert";
import {LoginLoader} from "../../UI/Loaders/loginLoader";
import {TextInput} from "../../UI/Inputs/textInput";
import {PasswordInput} from "../../UI/Inputs/passwordInput";

const ModalLayout = ({info, setEmailLog, setPasswordLog, updateModalMode, fetchCreateToken, fetchRegistration, updateIsLoginModalVisible}) => {
    //console.log(info);
    const [emailReg, setEmailReg] = useState('');
    const [nicknameReg, setNicknameReg] = useState('');
    const [passwordReg, setPasswordReg] = useState('');
    const loginHandler = () => {
        let isSuccess = false;
        if (info.logEmail.trim() !== '' && info.logPassword.trim() !== '') {
            isSuccess = true;
        }
        if (isSuccess) {
            fetchCreateToken(info.logEmail, info.logPassword);
        }
    }
    const registrationHandler = () => {
        let isSuccess = false;
        let emailIsCorrectly = false;
        if (emailReg.trim() !== '' && nicknameReg.trim() !== '' && passwordReg.trim() !== '') {
            isSuccess = true;
        }
        let re = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
        let valid = re.test(emailReg);
        if (valid) {
            emailIsCorrectly = true;
            isSuccess = true;
        }
        else {
            emailIsCorrectly = false;
            isSuccess = false;
        }
        if (isSuccess) fetchRegistration({email: emailReg, nickname: nicknameReg, password: passwordReg});
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
                        {info.requestLoginError &&
                            <div className="mt-2 text-center">
                                <DangerAlert text='Ошибка авторизации'/>
                            </div>}
                        {info.updateIsLoginLoading ?
                        <div className="d-flex justify-content-center mt-3">
                            <LoginLoader />
                        </div>
                            :
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
                </div>
                :
                <div className="my-modal">
                    <div className="header-modal mb-4">
                        <div className="h5">Create account</div>
                        <button type="button" className="btn-close" onClick={() => {updateIsLoginModalVisible(false); updateModalMode("login")}}/>
                    </div>
                    <div className="body-modal">
                        <TextInput label="Nickname" onTextChange={setNicknameReg} styles={{marginBottom: 15}}/>
                        <TextInput label="Email" onTextChange={setEmailReg} styles={{marginBottom: 15}}/>
                        <PasswordInput label="Password" onTextChange={setPasswordReg} styles={{marginBottom: 15}}/>
                        {info.requestRegistrationError && <DangerAlert text='Ошибка регистрации'/*text={info.registrationError}*//>}
                        {info.updateIsRegistrationLoading ?
                            <div className="d-flex justify-content-center">
                                <LoginLoader />
                            </div> :
                            <div className="btn btn-primary" onClick={()=>registrationHandler()}>
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
        {setLoginLog, setEmailLog, setPasswordLog, updateModalMode, fetchCreateToken, fetchRegistration, updateIsLoginModalVisible},
        dispatch
    );
export const Modal = connect(
    mapStateToProps,
    mapDispatchToProps
)(ModalLayout);