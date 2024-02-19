import React from "react";
import "./error.scss";
import cat from './sadCat.svg';
const Error = ({msg, title}) => {
    return (
        <div className="error">
        <div className="error__wrapper">
            <img src={cat} alt={msg} />
            <h1>{title}</h1>
            <p>{msg}</p>
        </div>
        </div>
    );
}
export default Error;