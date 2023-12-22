import React from "react";
import { Link } from "react-router-dom";

import SignUpForm from "../Components/RegistrationForm";

import hotel_logo from "../images/hotel.png";


const Registration = () => {

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
                   
                    <SignUpForm />
                </div>
                
            </div>
        </div>

    )
};

export default Registration;