import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import {auth} from "../config/firebase";
import { sendPasswordResetEmail } from "firebase/auth";

import hotel_logo from "../images/hotel.png";

import Loader from "../Components/Loader";

const ResetPassword = () => {

    const [isLoading, setIsLoading] = useState(false);

    const forgotPassword = (() => {
        setIsLoading(true)
        sendPasswordResetEmail(auth, email).then(() => {
            alert("Check your email");
        }).catch((error) => {

        })
        setIsLoading(false)
    })

    const[email, setPassword] = useState("");

    const history = useHistory();

    const goToBrowse = (() => {
        history.push("/browse")
    })

    return(
        <div className="ForgetPassword">
            <div className="background_image">

                <div className="hotel_stamp">
 
                    <div className="hotel_logo">
                        <Link to="/">
                            <svg width="50px" height="50px">
                                <image href={hotel_logo} height="40px" width="40px" />
                            </svg>
                        </Link>
                    </div>

                </div>

                {
                    isLoading ?
                    (
                        <Loader />
                    )
                    :
                    (
                        <>
                        <div className="forgetpassword_box">
                    <div className="forgetform">
                        <div style={{display:"flex", flexDirection:"column"}}>
                            <h3 style={{fontFamily: 'Cinzel',marginLeft:"30px", color: "white"}}>Reset your password</h3>

                            <input type="email"
                                name="email"
                                placeholder="Email Address"
                                className="logreg_input"
                                style={{marginLeft:"10px", marginBottom:"50px"}}
                                onChange={(event) => setPassword(event.target.value)} />

                            <button type="button"
                                name="login"
                                className="login_button"
                                style={{width:"200px",marginLeft:"110px"}}
                                onClick={forgotPassword}
                            >
                                <p className="reserve_button_text">Reset Password</p>
                            </button>
                        </div>
                    </div>
                </div>
                        </>
                    )
                }
                
            </div>
        </div>
    )
};

export default ResetPassword;