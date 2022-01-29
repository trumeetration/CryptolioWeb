import React from "react";
import {Table} from "../components/Table/Table"

export const MarketPage = () => {
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
            <Table />
        </div>
    )
}