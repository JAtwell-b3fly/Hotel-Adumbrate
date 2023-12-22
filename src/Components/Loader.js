import React from "react";
import hourglassLoader from "../images/circle-loader.gif";

const Loader = () => {
    return(
        <div className="login_box" style={{marginBottom: "10rem"}}>
        <div style={{justifyContent: "center", fontFamily: 'Cinzel', position: "absolute", zIndex: 1, marginLeft: "15rem"}}>
            <h2 style={{color: "white", textAlign: "center", marginTop: "3rem"}}>Loading...</h2>
            <svg style={{width: "100%", height: "100%", backgroundColor: "whitesmoke", borderRadius: "50rem", marginTop: "3rem"}}>
                <image href={hourglassLoader} width="100%" height="100%" />
            </svg>
        </div>
        </div>
    )
};

export default Loader;