import React from "react";
import { Link } from "react-router-dom";

import LoginForm from "../Components/LoginForm";

import hotel_logo from "../images/hotel.png";


const Login = ({loginEmailAddress, loginPassword, handleLoginEmailChange, handleLoginPasswordChange}) => {

    return(
        <div className="Browse">
            <div className="background_image">
                <div className="hotel_stamp">
 
                    <div className="hotel_logo">
                        <Link to="/">
                        <svg width="2.5rem" height="2.5rem">
                            <image href={hotel_logo} height="100%" width="100%" />
                        </svg>
                        </Link>
                    </div>

                </div>
        
                <div>
                   
                    <LoginForm 
                        loginEmailAddress={loginEmailAddress}
                        loginPassword={loginPassword}
                        handleLoginEmailChange={handleLoginEmailChange}
                        handleLoginPasswordChange={handleLoginPasswordChange}
                    />
                </div>
                
            </div>
        </div>

    )
};

export default Login;