import React from "react";

function InputEntry(props) {
    return <div className="text-center">   
        <label className="text-xl text-black" htmlFor={props.name}>{props.text}</label><br />
        <input onChange={props.changeFunction} type="text" className="px-3 py-1 rounded-lg mb-7 mt-3 w-64 h-10 text-center bg-[#eeeeee] text-black"
            id={props.name} name={props.name} placeholder={props.placeholder} value={props.value} autoComplete="on" required/>
        <br />
    </div>
}   

export default InputEntry;