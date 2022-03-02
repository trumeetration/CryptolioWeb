import React, {useState} from "react";
import {useInterval} from "../../Hooks/useInterval";
const colorList = ["#6c757d",
    "#0d6efd",
    "#198754",
    "#ffc107",
    "#dc3545",
    "#32b0f6"
];

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

export const Alert = ({id, header, body, removeFun}) => {
    const [timer, setTimer] = useState(0);
    const [imgColor, _] = useState(getRandomInt(0,4));
    useInterval(() => setTimer((prev)=> prev + 1), 1000)
    return (
        <div className="toast show">
            <div className="toast-header">
                <div style={{height: 20, width: 20, background: colorList[imgColor], marginRight: 5, borderRadius: 4}}/>
                    <strong className="me-auto">{header}</strong>
                    <small>{timer} секунд назад</small>
                    <button onClick={() => {removeFun(id)}} type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div className="toast-body">
                {body}
            </div>
        </div>
    )
}