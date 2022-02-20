import React from "react"
import {Table} from "../components/Table/Table";

export const PortfoliosPage = ({}) => {
    return (
        <div className="container flex-row">
            <div className="d-flex justify-content-between">
                <div className="column navbar-brand">
                    Your Assets
                </div>
            </div>
            <Table />
        </div>
    )
}