import React from "react";
import { Link } from "react-router-dom";

import LoginForm from "../Components/LoginForm";

import hotel_logo from "../images/hotel.png";


const Login = () => {

    return(
        <div className="Browse">
            <div className="background_image">
                <div className="hotel_stamp">
 
                    <div className="hotel_logo">
                        <Link to="/">
                        <svg width="50px" height="50px" xmlns="http://www.w3.org/2000/svg">
                            <image href={hotel_logo} height="40px" width="40px" />
                        </svg>
                        </Link>
                    </div>

                </div>
        
                <div>
                   
                    <LoginForm />
                </div>
                
            </div>
        </div>

    )
};

export default Login;