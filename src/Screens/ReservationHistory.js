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
import hotel_img from "../images/Hotel Room Family 2.png";

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
            const userUID = user.uid;
            const userCurrentUserEmail = user.email;

            const querySnapShot = await getDocs(collection(db, "reservations"));
            querySnapShot.forEach((doc) => {
                if (doc.data().reservationInformation.emailAddress === userCurrentUserEmail) {
                    setReservations(...reservations, doc.data());
                }
            })
        } catch (error) {
            console.error("Error in fetching reservations history");
        }
        setIsLoading(false);
    }

    useEffect (() => {
        getReservations();
        console.log("Reservations History: ", reservations);
    }, [])

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

                    <div style={{display: "flex", flexDirection: "row", flex: ""}}>
                        <div style={{marginLeft: "2rem", height: "27.5rem", width: "30rem"}}>
                            <svg className="reservationHistoryImg">
                                <image href = {hotel_img} width="100%" height="100%" />
                            </svg>
                        </div>

                        <div style={{justifyContent: "left", margin: "1rem"}}>
                            <h5 style={{color: "white", fontFamily: "Cinzel", marginBottom: "1rem"}}>Reference Number: RN9846876987</h5>
                            <h5  style={{color: "white", fontFamily: "Cinzel", fontWeight: "bold"}}>Dates:</h5>
                            <div style={{display: "flex", marginTop: "1rem"}}>
                            <p style={{color: "white", fontFamily: "Cinzel", marginRight: "5rem"}}>Arrival Date: 2023-12-01</p>
                            <p style={{color: "white", fontFamily: "Cinzel", marginRight: "5rem"}}>Arrival Time: 10:17</p>
                            </div>
                            <div style={{display: "flex"}}>
                            <p style={{color: "white", fontFamily: "Cinzel", marginRight: "4rem"}}>Departure Date: 2023-12-12</p>
                            <p style={{color: "white", fontFamily: "Cinzel"}}>Departure Time: 13:50</p>
                            </div>
                            <div style={{display: "flex"}}>
                            <p style={{color: "white", fontFamily: "Cinzel", marginRight: "4rem"}}>Date when reservation was made: 2023-11-20</p>
                            </div>
                            <h5 style={{color: "white", fontFamily: "Cintel", fontWeight: "bold", marginBottom:"1rem"}}>Summary:</h5>
                            <div style={{display: "flex"}}>
                            <p style={{color: "white", fontFamily: "Cinzel", marginRight: "9.5rem"}}>Price: R 14000</p>
                            <p style={{color: "white", fontFamily: "Cinzel"}}>Number of Days: 12</p>
                            </div>
                            <div style={{display: "flex"}}>
                            <p style={{color: "white", fontFamily: "Cinzel", marginRight: "7.6rem"}}>Suite Type: Couple</p>
                            <p style={{color: "white", fontFamily: "Cinzel"}}>Room Number: Room 202</p>
                            </div>
                            <div style={{display: "flex"}}>
                            <p style={{color: "white", fontFamily: "Cinzel", marginRight: "7.2rem"}}>Number of Adults: 2</p>
                            <p style={{color: "white", fontFamily: "Cinzel"}}>Number of Children: 0</p>
                            </div>
                            <div style={{display: "flex"}}>
                            <p style={{color: "white", fontFamily: "Cinzel", marginRight: "2rem", width: "100%"}}>Name: Preston Magakwe</p>
                            <p style={{color: "white", fontFamily: "Cinzel", marginRight: "2rem", width: "100%"}}>Email Address: prestonmagakwe18@gmail.com</p>
                            <p style={{color: "white", fontFamily: "Cinzel", width: "100%", marginRight: "2rem"}}>Physical Address: 25 Anderson Road</p>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
};

export default ReservationHistory;