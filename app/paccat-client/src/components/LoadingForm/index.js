import React from 'react'
import Loader from 'react-loader-spinner';
import './style.css';


const LoadingForm = (props) => {
    

    return (
        props.visible ? 
            <div className="container" style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh"}}>
            <Loader visible={props.loading} type="Grid" color="#00004d" height={80} width={80}/>
        </div> : <></>)
}


export default LoadingForm