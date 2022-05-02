import React, {useRef, useState} from "react";
import "./inputStyles.css";

export const TextInput = ({label, onTextChange, styles, oldText, placeholder}) => {
    const text = useRef("");
    return (
        <div className="w-100" style={styles}>
            <div className="modal-input-header text-start h6">{label}</div>
            <input type="text" placeholder={placeholder} className="my-input w-100" ref={text} onChange={(e)=>onTextChange(text.current.value)}/>
        </div>
)
}