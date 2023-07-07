import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import ProfileForm from "../Components/ProfileForm";

import hotel_logo from "../images/hotel.png";
import profile_button from "../images/profile-user.png";
import wishlist_button from "../images/wishlist.png";
import back from "../images/back.png";
import map_button from "../images/gps.png";
import logout_button from "../images/log-out.png";

const Profile = () => {

    const history = useHistory();

    const goToBrowse = (() => {
        history.push("/browse")
    })

    return(
        <div className="Profile">
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

                    <div className="back_button">
                        <svg width="50px" height="50px" xmlns="http://www.w3.org/2000/svg">
                            <image href={back} height="40px" width="40px" />
                        </svg>
                    </div>

                    <div className="display_navbar">

                        <Link to ="https://www.google.co.za/maps/place/Basilica+Cathedral+of+Saint+Denis/@48.9354313,2.3572644,17z/data=!4m14!1m7!3m6!1s0x47e66eb312fc18bd:0xf2ffbe58c6ffe57c!2sBasilica+Cathedral+of+Saint+Denis!8m2!3d48.9354278!4d2.3598393!16zL20vMGhrYjg!3m5!1s0x47e66eb312fc18bd:0xf2ffbe58c6ffe57c!8m2!3d48.9354278!4d2.3598393!16zL20vMGhrYjg?entry=ttu"  style={{height:"50px", width:"40px"}}>
                            <svg width="50px" height="50px" xmlns="http://www.w3.org/2000/svg">
                                <image href={map_button} height="40px" width="40px" />
                            </svg>
                        </Link>

                        <Link to="/wishlist" style={{height:"50px", width:"40px"}}>
                            <svg width="50px" height="50px" xmlns="http://www.w3.org/2000/svg">
                                <image href={wishlist_button} height="40px" width="40px" />
                            </svg>
                        </Link>

                        <Link to="/profile" style={{height:"50px", width:"40px"}}>
                            <svg width="50px" height="50px" xmlns="http://www.w3.org/2000/svg">
                                <image href={profile_button} height="40px" width="40px" />
                            </svg> 
                        </Link>

                            <svg width="50px" height="50px" xmlns="http://www.w3.org/2000/svg">
                                <image href={logout_button} height="40px" width="40px" />
                            </svg> 

                    </div>

                </div>
                
                <div>
                        <div>
                            <div>
                                <ProfileForm />
                            </div>
                        </div>

                </div>


            </div>
        </div>
    )
};

export default Profile;