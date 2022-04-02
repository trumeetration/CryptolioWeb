import React, {useState} from "react";
import "./inputStyles.css";

export const TextInput = ({label, onTextChange, styles, oldText}) => {
    const [text, setText] = useState("");
    const changeTextHandler = (value) => {
        setText(value);
        onTextChange(value);
    };
    return (
        <div className="w-100" style={styles}>
            <div className="modal-input-header text-start h6">{label}</div>
            <input type="text" className="my-input w-100" defaultValue={oldText} onChange={(e)=>changeTextHandler(e.target.value)}/>
        </div>
)
}