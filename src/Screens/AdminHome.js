import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import hotel_logo from "../images/hotel.png";
import profile_button from "../images/profile-user.png";
import wishlist_button from "../images/wishlist.png";
import back from "../images/back.png";
import map_button from "../images/gps.png";
import logout_button from "../images/log-out.png";
import rooms_button from "../images/signal.png";
import list_button from "../images/appointment.png";
import hotel_image from "../images/Hotel Adumbrate.jpg";

const AdminHome = () => {

    const history = useHistory();

    const goToAdminMain = (() => {
        history.push("/login/adminhome")
    })

    return(
        <div className="AdminHome">
            <div className="background_image">
                <div className="hotel_stamp">

                    <div className="hotel_logo">
                        <button
                            style={{borderStyle:"none", backgroundColor:"unset"}}
                            onClick={goToAdminMain}
                        >
                            <svg width="50px" height="50px" xmlns="http://www.w3.org/2000/svg">
                                <image href={hotel_logo} height="40px" width="40px" />
                            </svg>
                        </button>
                    </div>

                    <div style={{marginLeft:"10px"}}>
                        <h3  className="browse_welcome">Hi Jasmin, Let us help you manage hotel adumbrate</h3>
                    </div>

                    <div className="admin_navbar">

                        <svg width="50px" height="50px" xmlns="http://www.w3.org/2000/svg">
                            <image href={profile_button} height="40px" width="40px" />
                        </svg>

                        <svg width="50px" height="50px" xmlns="http://www.w3.org/2000/svg">
                            <image href={logout_button} height="40px" width="40px" />
                        </svg> 

                    </div>

                </div>

                <div className="types_suites" style={{marginTop:"70px"}}>
                        <div style={{display:"flex", margin:"20px"}}>
                            <div className="admin_home_buttons" style={{marginLeft:"20px"}}>
                                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                                    <image href={rooms_button} height="100%" width="100%" />
                                </svg>

                                <h3>Manage Rooms</h3>
                            </div>

                            <div className="admin_home_buttons" style={{marginLeft:"50px"}}>
                                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                                    <image href={list_button} height="100%" width="100%" />
                                </svg>

                                <h3>Manage Reservations</h3>
                            </div>
                            
                        </div>

                        <div>
                            <svg width="500px" height="800px" style={{marginLeft:"250px", borderRadius:"8%", objectFit:"fill"}}>
                                <image href={hotel_image} height="550px" width="590px" />
                            </svg>
                        </div>
                </div>
            </div>

        </div>
    )
};

export default AdminHome;