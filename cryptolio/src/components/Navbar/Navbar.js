import React, {useEffect} from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from "react-router-dom";
import {MainPage} from "../../Pages/Main";
import {MarketPage} from "../../Pages/Market";
import {PortfoliosPage} from "../../Pages/Portfolios";
import { connect, useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import {setActivePage} from "../../store/actions/activePageActions";
import {Modal} from "../Modals/Modal";
import {
    fetchVerifyToken,
    updateIsAuth,
    updateIsLoginModalVisible
} from "../../store/actions/authModalActions";
import {LoginLoader} from "../../UI/Loaders/loginLoader";
import {Alerts} from "../Alerts/AlertsList";

const NavbarLayout = ({info, infoAuth, setActivePage, updateIsLoginModalVisible, updateIsAuth, fetchVerifyToken}) => {
    useEffect(() => {
        fetchVerifyToken();
    }, [])
    //console.log(infoAuth);
    return (
        <div>
            <Router>
            {infoAuth.isLoginModalVisible && <Modal />}
            <nav className="navbar navbar-expand-lg navbar-light bg-light mb-3">
                <div className="container">
                    <div className="row flex-grow-1">
                        <div className="col-md-1 ms-0">
                            <Link to="/" className="navbar-brand d-flex justify-content-center" onClick={()=>setActivePage('Main')}>
                                Cryptolio
                            </Link>
                        </div>
                        <div className="col-md-4 offset-md-3">
                            <div className="d-flex justify-content-around navbar-nav">
                                <div className="nav-item">
                                    <Link to="/market" className="nav-link"
                                        onClick={()=>setActivePage('Market')}
                                    >
                                        Market
                                    </Link>
                                </div>
                                <Link to="/portfolios" className="nav-link"
                                      onClick={()=>setActivePage('Portfolios')}
                                >
                                    Portfolios
                                </Link>
                            </div>
                        </div>
                        <div className="col-md-2 offset-md-2 pe-0">
                            <div className="d-flex justify-content-end">
                                <div className="dropdown">
                                    <button
                                        className="btn btn-bd-light border-secondary dropdown-toggle"
                                        type="button"
                                        id="dropdownMenuButton1"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        USD
                                    </button>
                                    <ul
                                        className="dropdown-menu"
                                        aria-labelledby="dropdownMenuButton1"
                                    >
                                        <li>
                                            <a
                                                className="dropdown-item"
                                                href="#"
                                            >
                                                USD
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className="dropdown-item"
                                                href="#"
                                            >
                                                RUB
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                {infoAuth.isAuth ?
                                    <div className="d-flex flex-row align-items-center ms-2">
                                        {infoAuth.username}
                                        <button className="btn btn-primary ms-3 text-nowrap" onClick={() => updateIsAuth(false)}>
                                            Log out
                                        </button>
                                    </div>
                                :
                                    infoAuth.isHiddenLoginButton ?
                                    <div className="d-flex justify-content-center ms-3">
                                    <LoginLoader />
                                    </div> :
                                        <button className="btn btn-primary ms-3 text-nowrap" onClick={() => updateIsLoginModalVisible(true)}>
                                            Log in
                                        </button>

                                }
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <Switch>
                <Route exact path="/" render={({ match }) => <MainPage />} />
                <Route exact path="/market" render={({ match }) => <MarketPage />} />
                <Route exact path="/portfolios" render={({ match }) => <PortfoliosPage />} />
            </Switch>
        </Router>
            <Alerts />
        </div>
    );
};

const mapStateToProps = (state) => {
    const info = state.activePageReducer;
    const infoAuth = state.authModalReducer;
    return { info, infoAuth };
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {setActivePage, updateIsLoginModalVisible, updateIsAuth, fetchVerifyToken},
        dispatch
    );
export const Navbar = connect(
    mapStateToProps,
    mapDispatchToProps
)(NavbarLayout);
