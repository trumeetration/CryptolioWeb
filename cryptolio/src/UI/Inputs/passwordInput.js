import React, {useState} from "react";
import "./inputStyles.css";

export const PasswordInput = ({label, onTextChange, styles}) => {
    const [text, setText] = useState("");
    const changeTextHandler = (value) => {
        setText(value);
        onTextChange(value);
    };
    return (
        <div className="w-100" style={styles}>
            <div className="modal-input-header text-start h6">{label}</div>
            <input type="password" className="my-input w-100" defaultValue={text} onChange={(e)=>changeTextHandler(e.target.value)}/>
        </div>
    )
}