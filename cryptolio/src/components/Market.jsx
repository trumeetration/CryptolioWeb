import MarketTableItem from "./MarketTableItem";

function Market() {
    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between">
                <div className="fs-3">Market</div>
                <input className="form-control w-auto" placeholder="Cryptocurrency"/>
            </div>
            <table className="table align-middle table-hover m-3">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Currency</th>
                    <th scope="col">Market Price</th>
                    <th scope="col">24h Change</th>
                    <th scope="col">7d Change</th>
                    <th scope="col">Market Cap</th>
                    <th scope="col">24h Volume</th>
                </tr>
                </thead>
                <tbody>
                    <MarketTableItem data={{id: 1,  currency: 'Bitcoin', marketPrice: 50000, dayChange: 3.44, weekChange: 7.83, marketCap: 990000000, dayVolume: 100000}}/>
                </tbody>
            </table>
        </div>
    )
}

export default Market;