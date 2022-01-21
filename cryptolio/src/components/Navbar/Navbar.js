import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from "react-router-dom";
import {MainPage} from "../../Pages/Main";
import {MarketPage} from "../../Pages/Market";
import { connect, useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import {setActivePage} from "../../store/actions/activePageActions";

const NavbarLayout = ({info, setActivePage}) => {
    console.log(info)
    return (
        <Router>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
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
                                    <Link to="/market" className="navbar-brand d-flex justify-content-center"
                                        onClick={()=>setActivePage('Market')}
                                    >
                                        Market
                                    </Link>
                                </div>
                                <a className="nav-link" href="#">
                                    Portfolio
                                </a>
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
                                <button className="btn btn-primary ms-3">
                                    Log in
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <Switch>
                <Route exact path="/" render={({ match }) => <MainPage />} />
                <Route exact path="/market" render={({ match }) => <MarketPage />} />
            </Switch>
        </Router>
    );
};

const mapStateToProps = (state) => {
    const info = state.activePageReducer;
    return { info };
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {setActivePage,},
        dispatch
    );
export const Navbar = connect(
    mapStateToProps,
    mapDispatchToProps
)(NavbarLayout);