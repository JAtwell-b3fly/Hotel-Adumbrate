import {React, useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { db } from "../config/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore"; 

import hotel_logo from "../images/hotel.png";
import profile_button from "../images/profile-user.png";
import logout_button from "../images/log-out.png";
import rooms_button from "../images/signal.png";
import list_button from "../images/appointment.png";
import hotel_image from "../images/Hotel Adumbrate.jpg";
import add_rooms_button from "../images/add room.png";

import AdminRooms from "./ManageRooms";
import ReservationList from "../Components/ReservationDisplay";
import AddRooms from "../Components/AddRooms";
import ReservationCalender from "../Components/ReservationCalender";

const AdminHome = () => {

    //using these variables to store the state of which dashboard is showing and which is hidden
    const [showManageRooms, setShowManageRooms] = useState(false);
    const [showAddRooms, setShowAddRooms] = useState(false);
    const [showManageReservations, setShowManageReservations] = useState(false);
    const [userInfo, setUserInfo] = useState([]);

    //function to navigate to the different dashboard options one at a time
    const handleShowOption = (dashboard) => {
        setShowManageRooms(dashboard === "manageRooms");
        setShowAddRooms(dashboard === "addRooms");
        setShowManageReservations(dashboard === "manageReservations");
    }

    const history = useHistory();

    const goToAdminMain = (() => {
        history.push("/adminhome")
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

    useEffect(() => {
        getProfile();
       // console.log("User information: ", userInfo)
    });

    const getProfile = (async() => {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
            try {
                const userDocRef = doc(db, "users", user.email);
                const docSnap = await getDoc(userDocRef);

                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    setUserInfo(userData);
                } else {
                    console.log("No such document exists")
                }
            } catch (error) {
                console.error("Error the user information: ", error.message)
            }
        }
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
                            <svg width="2.5rem" height="2.5rem">
                                <image href={hotel_logo} height="100%" width="100%" />
                            </svg>
                        </button>
                    </div>

                    <div style={{marginLeft:"1rem"}}>
                        <h3  className="browse_welcome" style={{fontWeight: "900", color: "D5CEA3"}}>Hi {userInfo.fullName}, Let us help you manage hotel adumbrate</h3>
                    </div>

                    <div className="display_navbar" style={{width:"5rem", marginLeft:"52rem"}}>

                        <Link to="/profileadmin" style={{height:"2.9rem", width:"2.5rem"}}>
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

                <div className="admin_dashboard_box">
                    <div className="admin_dashboard_left">
                        <button
                            style={{borderStyle:"none", backgroundColor:"unset"}}
                            onClick={() => handleShowOption("manageRooms")}
                        >
                            {
                                showManageRooms && (
                                    <>
                                     <div className="managerooms"></div>
                                    </>
                               ) && !(
                                <>
                                    <div className="addrooms"></div>
                                </>
                               ) && !(
                                <>
                                    <div className="managereservations"></div>
                                </>
                               )
                            }
                            <svg width="100%" height="30%">
                                <image href={rooms_button} height="100%" width="100%" />
                            </svg>
                            <p style={{textAlign:"justify",fontFamily: 'Cinzel', color:"white", fontSize:"90%", marginLeft:"5rem", marginTop:"0.5rem"}}>Manage Rooms</p>
                        </button>

                        <button
                            style={{borderStyle:"none", backgroundColor:"unset"}}
                            onClick={() => handleShowOption("addRooms")}
                        >
                            {
                                showAddRooms && (
                                    <>
                                        <div className="addrooms"></div>
                                    </>
                                ) && !(
                                    <>
                                        <div className="managerooms"></div>
                                    </>
                                ) && !(
                                    <>
                                        <div className="managereservations"></div>
                                    </>
                                )

                            }
                            <svg width="3rem" height="3rem">
                                <image href={add_rooms_button} height="100%" width="100%" />
                            </svg>
                            <p style={{textAlign:"justify",fontFamily: 'Cinzel', color:"white", fontSize:"90%", marginLeft:"6rem", marginTop:"0.5rem"}}>Add Rooms</p>
                        </button>

                        <button
                            style={{borderStyle:"none", backgroundColor:"unset"}}
                            onClick={() => handleShowOption("manageReservations")}
                        >
                             {
                                showManageReservations && (
                                    <>
                                        <div className="managereservations"></div>
                                    </>
                                ) && !(
                                    <>
                                        <div className="managerooms"></div>
                                    </>
                                ) && !(
                                    <>
                                        <div className="addrooms"></div>
                                    </>
                                )
                            }
                            <svg width="3rem" height="3rem">
                                <image href={list_button} height="100%" width="100%" />
                            </svg>
                            <p style={{textAlign:"justify",fontFamily: 'Cinzel', color:"white", fontSize:"90%", marginLeft:"4rem", marginTop:"0.5rem"}}>Manage Reservations</p>
                        </button>

                        <div>
                            {/*<ReservationCalender /> */}
                        </div>
                    </div>

                    <div className="admin_dashboard_right">
                        {
                            showManageRooms ?
                            
                            <>
                            <div className="adminrooms">
                                <AdminRooms />
                            </div>
                            </>
                            :
                            null
                        }

                        {
                            showAddRooms ?
                            
                            <>
                            <div className="addrooms">
                                <AddRooms />
                            </div>
                            </>
                            :
                            null
                        }

                        {
                            showManageReservations ?

                            <>
                            <div className="managereservations">
                                <ReservationList />
                            </div>
                            
                            </>
                            :
                            null
                        }
                    </div>
                </div>
            </div>

        </div>
    )
};

export default AdminHome;