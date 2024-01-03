import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import {auth, db} from "../config/firebase";
import {collection, getDocs} from "firebase/firestore";

import reservation from "../images/tasks-completed.png";
import hotel_logo from "../images/hotel.png";
import profile_button from "../images/profile-user.png";  
import logout_button from "../images/log-out.png";
import contact_us from "../images/telephone.png";
import about_us from "../images/information-button.png";

import Loader from "../Components/Loader";

const ReservationHistory = () => {

    const [reservations, setReservations] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const history = useHistory();

    const goToBrowse = (() => {
        history.push("/browse")
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

    const getReservations = async() => {
        setIsLoading(true);
        try {
            const auth = getAuth();
            const user = auth.currentUser;
            const userCurrentUserEmail = user.email;

            const querySnapShot = await getDocs(collection(db, "reservations"));
            const userReservations = [];

            querySnapShot.forEach((doc) => {
                const reservationInfo = doc.data()?.reservationInformation;
                if (reservationInfo && reservationInfo.email === userCurrentUserEmail) {
                    userReservations.push(reservationInfo);
                }
            });

            setReservations(userReservations);
        } catch (error) {
            console.error("Error in fetching reservations history");
        }
        setIsLoading(false);
    }

    useEffect(() => {
        getReservations();
    }, [])

    useEffect(() => {
        console.log("Reservation History: ", reservations)
    }, [reservations])

    const filteredReservations = reservations.filter((reservation) => reservation && reservation.referenceNumber
    && reservation.referenceNumber.includes(searchTerm))

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

                    <div className="display_navbar" style={{marginLeft:"69rem", width: "12.8rem"}}>

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
                            <svg width="2.5rem" height="2.5rem" style={{borderRadius: "100%"}}>
                                <image href={reservation} height="100%" width="100%" />
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
                
                <div className="reservationBox">
                    {isLoading && <Loader />}
                    <div style={{display: "flex"}}>
                        <h1 className="add_room_heading" style={{color: "white", marginLeft: "5rem", fontFamily: "Cinzel", fontWeight: "bold"}}>RESERVATION HISTORY</h1>
                        <div className="admin_search_div" style={{marginLeft: "10rem"}}>
                        <input name="searchbar"
                            type="text"
                            className="admin_searchbar"
                            placeholder="Search here..."
                            style={{color: "black", fontWeight: "bolder"}}
                            value={searchTerm}
                            onChange={(event) => setSearchTerm(event.target.value)}
                        />
                        </div>
                    </div>

                    <div style={{overflowY: "auto", overflowX: "auto", width: "100%", height: "28rem"}}>
                        {searchTerm ? 
                        filteredReservations.map((filteredReservation) => {
                            console.log("FilteredReservation: ", filteredReservation);
                            return (
                            
                             <React.Fragment key={filteredReservation.id}>
                                {filteredReservation && filteredReservation.referenceNumber ? (
                                    <>
                                    <div style={{display: "flex", flexDirection: "row"}}>
                        <div style={{marginLeft: "2rem", height: "27.5rem", width: "30rem"}}>
                            <svg className="reservationHistoryImg">
                                <image href = {filteredReservation.image} width="100%" height="100%" />
                            </svg>
                        </div>

                        <div style={{justifyContent: "left", margin: "1rem"}}>
                            <h5 style={{color: "white", fontFamily: "Cinzel", marginBottom: "1rem"}}>Reference Number: {filteredReservation.referenceNumber}</h5>
                            <h5  style={{color: "white", fontFamily: "Cinzel", fontWeight: "bold"}}>Dates:</h5>
                            <div style={{display: "flex", marginTop: "1rem"}}>
                            <p style={{color: "white", fontFamily: "Cinzel", marginRight: "5rem"}}>Arrival Date: {filteredReservation.arrivalDate}</p>
                            <p style={{color: "white", fontFamily: "Cinzel", marginRight: "5rem"}}>Arrival Time: {filteredReservation.arrivalTime}</p>
                            </div>
                            <div style={{display: "flex"}}>
                            <p style={{color: "white", fontFamily: "Cinzel", marginRight: "4rem"}}>Departure Date: {filteredReservation.departureDate}</p>
                            <p style={{color: "white", fontFamily: "Cinzel"}}>Departure Time: {filteredReservation.depatureTime}</p>
                            </div>
                            <div style={{display: "flex"}}>
                            <p style={{color: "white", fontFamily: "Cinzel", marginRight: "4rem"}}>Date when reservation was made: {filteredReservation.reservationMadeDate}</p>
                            </div>
                            <h5 style={{color: "white", fontFamily: "Cintel", fontWeight: "bold", marginBottom:"1rem"}}>Summary:</h5>
                            <div style={{display: "flex"}}>
                            <p style={{color: "white", fontFamily: "Cinzel", marginRight: "9.5rem"}}>Price: R {filteredReservation.price}</p>
                            <p style={{color: "white", fontFamily: "Cinzel"}}>Number of Days: {filteredReservation.numberOfDays}</p>
                            </div>
                            <div style={{display: "flex"}}>
                            <p style={{color: "white", fontFamily: "Cinzel", marginRight: "7.6rem"}}>Suite Type: {filteredReservation.suite}</p>
                            <p style={{color: "white", fontFamily: "Cinzel"}}>Room Number: {filteredReservation.roomNumber}</p>
                            </div>
                            <div style={{display: "flex"}}>
                            <p style={{color: "white", fontFamily: "Cinzel", marginRight: "7.2rem"}}>Number of Adults: {filteredReservation.numberOfAdults}</p>
                            <p style={{color: "white", fontFamily: "Cinzel"}}>Number of Children: {filteredReservation.numberOfChildren}</p>
                            </div>
                        </div>
                        </div>

                        <p style={{color: "white", marginLeft: "5rem", marginRight: "5rem", textAlign: "center", width: "100%", marginBottom: "2rem"}}>____________________________________________________________________________________________________________</p>
                                    </>
                                ): null}
                             
                             </React.Fragment>
                            )
                        }
                        )
                        :
                        reservations.map((reservation) => {
                            console.log("Reservations: ", reservations)
                            return (
                            <>
                             <React.Fragment key={reservation.id}>
                             <div style={{display: "flex", flexDirection: "row"}}>
                        <div style={{marginLeft: "2rem", height: "27.5rem", width: "30rem"}}>
                            <svg className="reservationHistoryImg">
                                <image href = {reservation.image} width="100%" height="100%" />
                            </svg>
                        </div>

                        <div style={{justifyContent: "left", margin: "1rem"}}>
                            <h5 style={{color: "white", fontFamily: "Cinzel", marginBottom: "1rem"}}>Reference Number: {reservation.referenceNumber}</h5>
                            <h5  style={{color: "white", fontFamily: "Cinzel", fontWeight: "bold", marginTop: "2rem"}}>Dates:</h5>
                            <div style={{display: "flex", marginTop: "1rem"}}>
                            <p style={{color: "white", fontFamily: "Cinzel", marginRight: "5rem"}}>Arrival Date: {reservation.arrivalDate}</p>
                            <p style={{color: "white", fontFamily: "Cinzel", marginRight: "5rem"}}>Arrival Time: {reservation.arrivalTime}</p>
                            </div>
                            <div style={{display: "flex"}}>
                            <p style={{color: "white", fontFamily: "Cinzel", marginRight: "4rem"}}>Departure Date: {reservation.departureDate}</p>
                            <p style={{color: "white", fontFamily: "Cinzel"}}>Departure Time: {reservation.depatureTime}</p>
                            </div>
                            <div style={{display: "flex"}}>
                            <p style={{color: "white", fontFamily: "Cinzel", marginRight: "4rem"}}>Date when reservation was made: {reservation.reservationMadeDate}</p>
                            </div>
                            <h5 style={{color: "white", fontFamily: "Cintel", fontWeight: "bold", marginBottom:"1rem", marginTop: "2rem"}}>Summary:</h5>
                            <div style={{display: "flex"}}>
                            <p style={{color: "white", fontFamily: "Cinzel", marginRight: "9.5rem"}}>Price: R {reservation.priceCalculated}</p>
                            <p style={{color: "white", fontFamily: "Cinzel", marginRight: "9.5rem"}}>Price per night: R {reservation.price}</p>
                            </div>
                            <div style={{display: "flex"}}>
                            <p style={{color: "white", fontFamily: "Cinzel"}}>Number of Days: {reservation.numberOfDays}</p>
                            </div>
                            <div style={{display: "flex"}}>
                            <p style={{color: "white", fontFamily: "Cinzel", marginRight: "7.6rem"}}>Suite Type: {reservation.suite}</p>
                            <p style={{color: "white", fontFamily: "Cinzel"}}>Room Number: {reservation.roomNumber}</p>
                            </div>
                            <div style={{display: "flex"}}>
                            <p style={{color: "white", fontFamily: "Cinzel", marginRight: "7.2rem"}}>Number of Adults: {reservation.numberOfAdults}</p>
                            <p style={{color: "white", fontFamily: "Cinzel"}}>Number of Children: {reservation.numberOfChildren}</p>
                            </div>
                        </div>
                        </div>

                        <p style={{color: "white", marginLeft: "5rem", marginRight: "5rem", textAlign: "center", width: "100%", marginBottom: "2rem"}}>____________________________________________________________________________________________________________</p>
                             </React.Fragment>
                            </>
                            )
})}
                    {reservations && reservations.length === 0 && (
                            <>
                             <React.Fragment>
                             <div style={{display: "flex", justifyContent: "center", marginTop: "10rem"}}>

                        <div style={{justifyContent: "center", margin: "1rem"}}>
                            <h5 style={{color: "white", fontFamily: "Cinzel", marginBottom: "1rem", textAlign: "center"}}>You Have Made No Reservations</h5>
                        </div>
                        </div>
                        <p style={{color: "white", marginLeft: "5rem", marginRight: "5rem", textAlign: "center", width: "100%", marginBottom: "2rem"}}>____________________________________________________________________________________________________________</p>
                             </React.Fragment>
                             </>
                    )
                    }
                    </div>
                </div>


            </div>
        </div>
    )
};

export default ReservationHistory;