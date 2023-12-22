import {React, useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { db } from "../config/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore"; 

import hotel_logo from "../images/hotel.png";
import profile_button from "../images/profile-user.png";
import wishlist_button from "../images/wishlist.png";
import hotel_image from "../images/Hotel Room Single 4.png";
import about_us from "../images/information-button.png";
import logout_button from "../images/log-out.png";
import contact_us from "../images/telephone.png";

const Browse = () => {

    const history = useHistory();
    const [userInfo, setUserInfo] = useState([]);
    

    const goToBrowse = (() => {
        history.push("/browse")
    });

    const goToAvailableRooms = (() => {
        history.push("./availablerooms")
    });

    const goToAboutUs = (() => {
        history.push("/aboutus")
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
        console.log("User information: ", userInfo)
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
        <div className="Browse">
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

                    <div style={{marginLeft:"0.2rem", marginTop:"1rem"}}>
                        <h3  className="browse_welcome" style={{color: "D5CEA3"}}>Hi {userInfo.fullName}, Let us help you find your preferred stay</h3>
                    </div>

                    <div className="display_navbar" style={{marginLeft:"46rem"}}>

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

                        <Link to="/wishlist" style={{height:"2.9rem", width:"2.5rem"}}>
                            <svg width="2.5rem" height="2.5rem">
                                <image href={wishlist_button} height="100%" width="100%" />
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
                
                <div className="types_suites">
                    <div>
                        <svg width="30rem" height="30rem" style={{ borderRadius:"9%", objectFit:"fill"}}>
                            <image href={hotel_image} height="100%" width="100%" />
                        </svg>
                    </div>

                    <div style={{width:"35rem", marginLeft:"10%", marginTop:"2rem"}}>
                        <h1 style={{fontFamily: 'Cinzel', fontStyle:"oblique", color:"white"}}>Choose your luxurious room</h1>
                                
                        <h5 style={{textAlign:"justify",fontFamily: 'Cinzel', color:"white", fontSize:"100%"}}>We pride ourselves on our wide selection of suites to suite your personal needs. Choosing a suite will allow us to provide all our selections per suite chosen.
                        <br /><br />
                        We cater for people who are on business trips or single travelors.
                        <br /><br />
                        We cater for couples travelling together on vacation, celebrating anniversaries, weddings and so much more.
                        <br /><br />
                        We also cater for families travelling on vacation as well. Providing facilities specially for the little ones to express themselves without any restrictions within those spaces.
                        </h5>

                        <div style={{display:"flex", marginTop:"1rem"}}>
                            <div>
                                <button
                                    type="button"
                                    name="Read More Button"
                                    className="browse_buttons"
                                    onClick={goToAboutUs}
                                >
                                    <p className="browse_button_text">Read More</p>
                                </button>
                            </div>

                            <div style={{marginLeft:"2rem"}}>
                                <button
                                    type="button"
                                    name="Start Now Button"
                                    className="browse_buttons"
                                    onClick={goToAvailableRooms}
                                >
                                    <p className="browse_button_text">Book Now</p>
                                </button>
                            </div>
                        </div>

                    </div>

                    

                </div>

            </div>
        </div>
    )
};

export default Browse;