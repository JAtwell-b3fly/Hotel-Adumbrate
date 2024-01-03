import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

import ReservationForm from "../Components/ReservationForm";

import hotel_logo from "../images/hotel.png";
import profile_button from "../images/profile-user.png";
import reservations from "../images/tasks-completed.png";
import back from "../images/back.png";
import logout_button from "../images/log-out.png";
import about_us from "../images/information-button.png";
import contact_us from "../images/telephone.png";

const ReservationFormScreen = () => {

    const history = useHistory();
    const {state} = useLocation();
    const selectedRoom = state;

    const goToBrowse = (() => {
        history.push("/browse")
    });

    const goToDisplay = (() => {
        history.push("/display", selectedRoom)
    });

    const Logout = (() => {
        const auth = getAuth();
        signOut(auth).then(() => {
            history.push("/");
            alert("You are Logged Out");
        }).catch((error) => {
            console.error("You could not be logged out", error);
        })
    });

    return(
        <div className="Reservation">
            <div className="background_image">
                <div className="hotel_stamp">

                    <div className="hotel_logo">
                        <button
                        style={{borderStyle:"none", backgroundColor:"unset"}}
                        onClick={goToBrowse}
                        >
                            <svg width="2.5rem" height="2.5rem">
                                <image href={hotel_logo} height="100%" width="100%" />
                            </svg>
                        </button>
                    </div>

                    <div className="back_button">
                        <button 
                        style={{borderStyle:"none", backgroundColor:"unset"}}
                        onClick={goToDisplay}>
                            <svg width="2.5rem" height="2.5rem">
                                <image href={back} height="100%" width="100%" />
                            </svg>
                        </button>
                    </div>

                    <div className="display_navbar" style={{ marginLeft: "65rem", width: "12.8rem"}}>

                    <Link to ="/aboutus"  style={{height:"2.9rem", width:"2.5rem"}}>
                            <svg width="2.5rem" height="2.5rem">
                                <image href={about_us} height="100%" width="100%" />
                            </svg>
                        </Link>

                        <Link to ="/contactus"  style={{height:"2.9rem", width:"2.5rem"}}>
                            <svg width="2.5rem" height="2.5rem">
                                <image href={contact_us} height="100%" width="100%" />
                            </svg>
                        </Link>

                        <Link to="/reservationhistory" style={{height:"2.9rem", width:"2.5rem"}}>
                            <svg width="2.5rem" height="2.5rem">
                                <image href={reservations} height="100%" width="100%" />
                            </svg>
                        </Link>

                        <Link to="/profile" style={{height:"2.9rem", width:"2.5rem"}}>
                            <svg width="2.5rem" height="2.5rem">
                                <image href={profile_button} height="100%" width="100%" />
                            </svg> 
                        </Link>

                        <button
                        style={{borderStyle:"none", backgroundColor:"unset"}}
                        onClick={Logout}
                        >
                            <svg width="2.5rem" height="2.5rem">
                                <image href={logout_button} height="100%" width="100%" />
                            </svg>  
                        </button>
                    </div>

                </div>
                
                <div>
                        <div>
                            <div>
                                <ReservationForm selectedRoom={selectedRoom} />
                            </div>

                        </div>

                </div>


            </div>
        </div>
    )
};

export default ReservationFormScreen;