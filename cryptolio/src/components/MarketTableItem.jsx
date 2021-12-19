function MarketTableItem(props) {
    return (
        <tr style={{height: 75}}>
            <th scope="row">{props.data.id}</th>
            <td>{props.data.currency}</td>
            <td>{props.data.marketPrice}</td>
            <td>+{props.data.dayChange}%</td>
            <td>+{props.data.weekChange}%</td>
            <td>${props.data.marketCap}</td>
            <td>${props.data.dayVolume}</td>
        </tr>
    )
}

export default MarketTableItem;