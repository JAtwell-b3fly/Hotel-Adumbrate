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

const AdminRooms = () => {

    const history = useHistory();

    const goToAdminMain = (() => {
        history.push("/loginsignup/adminhome")
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

                    <div className="back_button">
                        <button 
                        style={{borderStyle:"none", backgroundColor:"unset"}}
                        onclick={goToAdminMain}>
                            <svg width="50px" height="50px" xmlns="http://www.w3.org/2000/svg">
                                <image href={back} height="40px" width="40px" />
                            </svg>
                        </button>
                    </div>

                    <div className="admin_navbar" style={{marginLeft:"1450px"}}>

                        <svg width="50px" height="50px" xmlns="http://www.w3.org/2000/svg">
                            <image href={profile_button} height="40px" width="40px" />
                        </svg>

                        <svg width="50px" height="50px" xmlns="http://www.w3.org/2000/svg">
                            <image href={logout_button} height="40px" width="40px" />
                        </svg> 

                    </div>

                </div>

                <div className="admin_room_box">
                        <div style={{display:"flex", margin:"20px"}}>
                            
                        </div>

                        <div>
                            
                        </div>
                </div>
            </div>

        </div>
    )
};

export default AdminRooms;