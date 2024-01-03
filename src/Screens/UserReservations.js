import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { collection, addDoc} from "firebase/firestore";
import { db } from "../config/firebase";
import { useLocation } from "react-router-dom";

import hotel_logo from "../images/hotel.png";
import profile_button from "../images/profile-user.png";
import reservations from "../images/tasks-completed.png";
import back from "../images/back.png";
import logout_button from "../images/log-out.png";
import about_us from "../images/information-button.png";
import contact_us from "../images/telephone.png";

import Loader from "../Components/Loader";

const UserReservations = () => {

    //Navigation variable
    const history = useHistory();

    const [isLoading, setIsLoading] = useState(false);

    //Pull data from previous screen being pushed
    const {state} = useLocation();
    const reservationInformation = state;
    const selectedRoom = state;
    console.log("ReservationInformation: ", reservationInformation)

    const goToBrowse = (() => {
        history.push("/browse")
    });

    const goToReservationForm = (() => {
        history.push("/reservationform", selectedRoom, reservationInformation)
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

    const addReservation = async() => {
        setIsLoading(true);
        try {
                const userDocRef = collection(db, "reservations");
                await addDoc(userDocRef, {
                    reservationInformation
                })
                setIsLoading(false)
                alert("Thank you for making your reservation with us. To view your reservations: 1. Navigate to Profile Screen. 2. Select Reservation History");
                
                history.push("/browse")
        } catch (error) {
            console.log("Error" + error.message);
        }

    };

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
                    onClick={goToReservationForm}
                    >
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
                {isLoading ?
                (
                    <Loader />
                )
                :
                (
                    <>
                    <div className="user-reservation_box">
                    <div className="userReservation_image" style={{marginRight: "1rem"}}>
                        <svg width="30rem" height= "33rem" className="reservations_image">
                            <image href={reservationInformation.image} width="100%" height="100%" />
                        </svg>
                    </div>

                    <div>
                        <h3 style ={{color: "white"}} className="reservation_confirmation_title">{reservationInformation.name} Please Confirm Your Booking Information</h3>
                        <p className="reservation_confirmation_text" style={{color: "white", marginTop: "2rem"}}>Go back to the previous screen to make any changes.    Contact us for any inquiries</p>

                        <div className="reservation_info_div">
                            <p className="reservation_confirmation_text" style={{color: "white", marginRight: "1rem"}}>Reference Number: </p> 
                            <p className="reservation_confirmation_text" style={{color: "white"}}>{reservationInformation.referenceNumber}</p>
                        </div>

                        <div className="reservation_info_div">
                            <p className="reservation_confirmation_text" style={{color: "white", marginRight: "1rem"}}>Suite and Room Number: </p> 
                            <p className="reservation_confirmation_text" style={{color: "white"}}>{reservationInformation.hotelSuite} Suite, {reservationInformation.roomNumber}</p>
                        </div>

                        <div className="reservation_info_div">
                            <p className="reservation_confirmation_text" style={{color: "white", marginRight: "1rem"}}>Price: </p>
                            <p className="reservation_confirmation_text" style={{color: "white"}}>R {reservationInformation.priceCalculated} </p>
                            <p className="reservation_confirmation_text" style={{color: "white", marginRight: "1rem", marginLeft: "5rem"}}>Price per night: </p>
                            <p className="reservation_confirmation_text" style={{color: "white"}}>R {reservationInformation.price} </p>
                            <p className="reservation_confirmation_text" style={{color: "white", marginRight: "1rem", marginLeft: "5rem"}}>Number of Days: </p>
                            <p className="reservation_confirmation_text" style={{color: "white"}}>{reservationInformation.numberOfDays} </p>
                        </div>

                        <table style={{backgroundColor: "whitesmoke", borderRadius: "1rem", marginBottom: "2rem"}}>
                            <tr>
                                <th style={{width: "8rem",textAlign: "center"}}>Arrival Date</th>
                                <th style={{width: "8rem",textAlign: "center"}}>Departure Date</th>
                                <th style={{width: "12rem",textAlign: "center"}}>Number of Adults</th>
                                <th style={{width: "12rem",textAlign: "center"}}>Number of Children</th>
                            </tr>

                            <tr>
                                <td style={{textAlign: "center"}}>{reservationInformation.arrivalDate}</td>
                                <td style={{textAlign: "center"}}>{reservationInformation.departureDate}</td>
                                <td style={{textAlign: "center"}}>{reservationInformation.numberOfAdults}</td>
                                <td style={{textAlign: "center"}}>{reservationInformation.numberOfChildren}</td>
                            </tr>
                        </table>

                        <table style={{backgroundColor: "whitesmoke", borderRadius: "1rem"}}>
                            <tr>
                                <th style={{width: "8rem",textAlign: "center"}}>Bedrooms</th>
                                <th style={{width: "8rem",textAlign: "center"}}>Bathrooms</th>
                                <th style={{width: "12rem",textAlign: "center"}}>Air Conditioning</th>
                                <th style={{width: "8rem",textAlign: "center"}}>Television</th>
                                <th style={{width: "8rem",textAlign: "center"}}>Wifi</th>
                                <th style={{width: "8rem",textAlign: "center"}}>Balcony</th>
                                <th style={{width: "8rem",textAlign: "center"}}>Fireplace</th>
                            </tr>

                            <tr>
                                <td style={{textAlign: "center"}}>{reservationInformation.bed}</td>
                                <td style={{textAlign: "center"}}>{reservationInformation.bathroom}</td>
                                <td style={{textAlign: "center"}}>{reservationInformation.airConditioning}</td>
                                <td style={{textAlign: "center"}}>{reservationInformation.television}</td>
                                <td style={{textAlign: "center"}}>{reservationInformation.wifi === true ? "Yes" : "No"}</td>
                                <td style={{textAlign: "center"}}>{reservationInformation.balcony === true ? "Yes" : "No"}</td>
                                <td style={{textAlign: "center"}}>{reservationInformation.fireplace === true ? "Yes" : "No"}</td>
                            </tr>
                        </table>

                        <div style={{flexDirection: "row", marginTop: "2rem"}}>
                            <button className="reserve_now_button" style={{marginLeft: "15rem"}} onClick={addReservation}><p className="reserve_button_text">Confirm Booking</p></button>
                        </div>

                    </div>

                </div>
                    </>
                )
                }


            </div>


        </div>
    </div>
    )
};

export default UserReservations;