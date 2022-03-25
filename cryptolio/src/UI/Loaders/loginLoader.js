import "./styles.css"
export const LoginLoader = () => {
    return (
        <>
            {<div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>}
            {/*<div className="lds-roller" style={{width: 10, height: 10 }}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>*/}
        </>
    )
}