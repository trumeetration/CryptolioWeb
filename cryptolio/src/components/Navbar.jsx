function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">

                <div className="container-fluid">
                    <div className="row flex-grow-1">
                        <div className="col-md-1 ms-0">
                            <a className="navbar-brand d-flex justify-content-center" href="#">Cryptolio</a>
                        </div>
                        <div className="col-md-4 offset-md-3">
                            <div className="d-flex justify-content-around navbar-nav">
                                <div className="nav-item">
                                    <a className="nav-link active" href="#">Market</a>
                                </div>
                                <a className="nav-link" href="#">Portfolio</a>
                            </div>
                        </div>
                        <div className="col-md-2 offset-md-2 pe-0">
                            <div className="d-flex justify-content-end">
                                <div className="dropdown">
                                    <button className="btn btn-bd-light border-secondary dropdown-toggle" type="button"
                                            id="dropdownMenuButton1"
                                            data-bs-toggle="dropdown" aria-expanded="false">
                                        USD
                                    </button>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                        <li><a className="dropdown-item" href="#">USD</a></li>
                                        <li><a className="dropdown-item" href="#">RUB</a></li>
                                    </ul>
                                </div>
                                <button className="btn btn-primary ms-3">Log in</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>

    )
}

export default Navbar;