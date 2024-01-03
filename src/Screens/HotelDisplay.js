import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { useLocation } from "react-router-dom";

import hotel_logo from "../images/hotel.png";
import profile_button from "../images/profile-user.png";
import reservations from "../images/tasks-completed.png";
import fourRating from "../images/4starrating.png";
import oneRating from "../images/1starrating.png";
import twoRating from "../images/2starrating.png";
import threeRating from "../images/3starrating.png";
import fiveRating from "../images/5starrating.png";
import zeroRating from "../images/0starrating.png";
import bed from "../images/bed.png";
import bath from "../images/bathtub.png";
import tv from "../images/television.png";
import ac from "../images/air-conditioner.png";
import back from "../images/back.png";
import logout_button from "../images/log-out.png";
import contact_us from "../images/telephone.png";
import about_us from "../images/information-button.png";

const HotelDisplay = () => {
    const history = useHistory();
    const {state} = useLocation();
    const selectedRoom = state;
    console.log("Selected Room: ", selectedRoom);

    const goBack = (() => {
        history.push("/availablerooms")
    })

    const goToBrowse = (() => {
        history.push("/browse")
    })

    const goToReserveForm = (() => {
        history.push("/reservationform", selectedRoom);
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

    return(
        <div className="HotelDisplay">
            <div className="background_image">
                <div className="hotel_stamp">

                    <div className="hotel_logo">
                        <button
                        type="button"
                        name="hotel_logo"
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
                        type="button"
                        name="back_button"
                        style={{borderStyle:"none", backgroundColor:"unset"}}
                        onClick={goBack}>
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
                
                <div className="displaybox">
                    {selectedRoom ? (
                        <>
                    <div className="suite_image_div">
                        <svg width= "100%" height="100%" className="suite_image">
                            <image href={selectedRoom.image} height="100%" width= "100%" />
                        </svg> 
                    </div>

                    <div className="display_description">

                        <div className="Descr_row1">
                            <div style={{marginTop:"0.5rem"}}>
                                <h3 className="suite_name" style={{color: "white"}}>{selectedRoom.suite} Suite</h3>

                                <div className="room_number">
                                    <p className="room_number" style={{color: "white"}}>{selectedRoom.roomNumber}</p>
                                </div>
                            </div>
                            
                            <div className="rating_wishlist_div"   style={{backgroundColor: "rgb(213, 206, 163, 0.05)", borderRadius: "10rem", paddingRight: "1rem"}}>
                                <div className="display_rating">
                                    <svg width= "100%" height="100%" className="display_rating">
                                        {selectedRoom.rating === 0 && (
                                            <image href={zeroRating} height="100%" width="100%" />
                                        )}

                                        {selectedRoom.rating === 1 && (
                                            <image href={oneRating} height="100%" width="100%" />
                                        )}

                                        {selectedRoom.rating === 2 && (
                                            <image href={twoRating} height="100%" width="100%" />
                                        )}

                                        {selectedRoom.rating === 3 && (
                                            <image href={threeRating} height="100%" width="100%" />
                                        )}

                                        {selectedRoom.rating === 4 && (
                                            <image href={fourRating} height="100%" width="100%" />
                                        )}

                                        {selectedRoom.rating === 5 && (
                                            <image href={fiveRating} height="100%" width="100%" />
                                        )}
                                    </svg>
                                </div>

                            </div>

                        </div>


                        <div className="perks">
                            <svg width= "1.5rem" height="1.5rem" className="perk_image">
                                <image href={bed} height="100%" width= "100%" />
                            </svg>

                            <p className="perk_description" style={{fontWeight: "600"}}>{selectedRoom.bed} Bedroom</p>

                            <svg width= "1.5rem" height="1.5rem" className="perk_image">
                                <image href={bath} height="100%" width= "100%" />
                            </svg>

                            <p className="perk_description" style={{fontWeight: "600"}}>{selectedRoom.bathroom} Bathroom</p>

                            <svg width= "1.5rem" height="1.5rem" className="perk_image">
                                <image href={tv} height="100%" width= "100%" />
                            </svg>

                            <p className="perk_description" style={{fontWeight: "600"}}>{selectedRoom.television} Television</p>

                            <svg width= "1.5rem" height="1.5rem" className="perk_image">
                                <image href={ac} height="100%" width= "100%" />
                            </svg>

                            <p className="perk_description" style={{fontWeight: "600"}}>{selectedRoom.airConditioning} Air Conditioning</p>
                        </div>

                        <div className="suite_description_div" style={{color: "white",  overflowY: "scroll", paddingRight: "2rem"}}>
                            <p className="suite_description" style={{color: "white"}}>
                                {selectedRoom.longDescription}
                            </p>
                        </div>


                        <div className="price_reservation">
                            <div className="price">
                                <p style={{color: "white"}}>
                                    Price
                                </p>
                                <div style={{display:"flex", width: "12rem"}}>
                                    <h4 style={{color: "white"}}>R {selectedRoom.price}</h4> 
                                    <p style={{marginTop:"0.5rem", color: "white"}}>/night</p>
                                </div>
                                
                            </div>

                            <div className="reserve_button_div">
                                <button
                                    name="Reserve_Now"
                                    type="button"
                                    className="reserve_now_button"
                                    onClick={goToReserveForm}
                                >
                                  <p className="reserve_button_text">Reserve Now</p>
                                </button>
                            </div>
                        </div>

                    </div>
                    </>) : (<p>No room selected</p>)}
                    
                </div>

            </div>
            
        </div>
    )
};

export default HotelDisplay;