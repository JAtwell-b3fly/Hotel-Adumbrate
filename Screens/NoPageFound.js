import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import hotel_logo from "../images/hotel.png";
import appointment_button from "../images/appointment.png";
import profile_button from "../images/profile-user.png";
import wishlist_button from "../images/wishlist.png";
import single from "../images/man.png";
import couple from "../images/couple-silhouette.png";
import family from "../images/together.png";
import hotel_image from "../images/Hotel Adumbrate.jpg";
import map_button from "../images/gps.png";
import logout_button from "../images/log-out.png";
import pagenotfound from "../images/nopagefound.jpg";

const NoPageFound = () => {

    const history = useHistory();

    const goToBrowse = (() => {
        history.push("/browse")
    })

    return(
        <div className="NoPageFound">
            <div className="background_image">
                <div className="hotel_stamp">

                    <div className="hotel_logo">
                        <button
                        style={{borderStyle:"none", backgroundColor:"unset"}}
                        onClick={goToBrowse}
                        >
                            <svg width="50px" height="50px" xmlns="http://www.w3.org/2000/svg">
                                <image href={hotel_logo} height="40px" width="40px" />
                            </svg>
                        </button>
                    </div>

                </div>

                <div className="pagenotfound">
                
                </div>

            </div>
        </div>
    )
};

export default NoPageFound;