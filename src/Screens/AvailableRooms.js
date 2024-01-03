import React, {useState} from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

import AvailableRoomsComp from "../Components/AvailableRooms";

import hotel_logo from "../images/hotel.png";
import profile_button from "../images/profile-user.png";
import reservations from "../images/tasks-completed.png";
import back from "../images/back.png";
import logout_button from "../images/log-out.png";
import contact_us from "../images/telephone.png";
import about_us from "../images/information-button.png";
import search from "../images/search.png";

const AvailableRooms = () => {

    const history = useHistory();

    const goToBrowse = (() => {
        history.push("/browse");
    })

    const goBack = (() => {
        history.push("/browse");
    })

    const Logout = (() => {
        const auth = getAuth();
        signOut(auth).then(() => {
            history.push("/");
            alert("You are Logged Out");
        }).catch((error) => {
            console.error("You could not be logged out", error);
        })
    });

    const [searchTerm, setSearchTerm] = useState("");

    return(
        <div className="Profile">
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
                        onClick={goBack}
                        >
                            <svg width="2.5rem" height="2.5rem">
                                <image href={back} height="100%" width="100%" />
                            </svg>
                        </button>
                    </div>

                    <div className="search_bar_div" style={{marginTop:"1.1rem", marginLeft: "25rem"}}>
                        <input name="searchbar"
                                type="text"
                                className="searchbar"
                                placeholder="Search here.. ."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        {/*<svg style={{width: "3rem", height: "3rem"}} className="searchbar">
                            <image href={search} width="100%" height="100%" />
    </svg>*/}
                    </div>

                    <div className="display_navbar" style={{width: "12.8rem"}}>

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
                                <AvailableRoomsComp searchTerm={searchTerm} />
                            </div>
                        </div>

                </div>


            </div>
        </div>
    )
};

export default AvailableRooms;