import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

import hotel_logo from "../images/hotel.png";
import profile_button from "../images/profile-user.png";
import reservations from "../images/tasks-completed.png";
import hotel_image from "../images/Hotel Room Single 4.png";
import about_us from "../images/information-button.png";
import logout_button from "../images/log-out.png";
import contact_us from "../images/telephone.png";

const AboutUs = () => {

    const history = useHistory();

    const goToBrowse = (() => {
        history.push("/browse")
    });

    const goToAvailableRooms = (() => {
        history.push("./availablerooms")
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
                
                <div className="types_suites">
                    <div>
                        <svg width="30rem" height="30rem" style={{ borderRadius:"9%", objectFit:"fill"}}>
                            <image href={hotel_image} height="100%" width="100%" />
                        </svg>
                    </div>

                    <div style={{width:"35rem", marginLeft:"10%", marginTop:"2rem"}}>
                        <h1 style={{fontFamily: 'Cinzel', fontStyle:"oblique", color:"white", position: "relative"}}>About Us</h1>
                                
                        <h5 style={{textAlign:"justify",fontFamily: 'Cinzel', color:"white", fontSize:"90%", position: "relative"}}>
                            We pride ourselves on our wide selection of suites to suite your personal needs. 
                            <br /> <br />
                            Choosing a suite will allow us to provide all our selections per suite chosen.
                            Design and comfort are perfectly combined here, because we care about your well-being – all the materials used for room decoration are environment friendly, and your individual climate control can be adjusted accurately by degree.
                            <br /> <br />
                            Our friendly and professional staff will efficiently be at your service in the best discretionary  manner to provide your comfortable staying.
                            <br /> <br />
                            Book your holiday or event with us – and check our special offers – to experience the very best at Hotel Adumbrate.

                            Superior interior design, ambiance of natural sunlight and great views make us a as popular a choice for tailor-made events.
                        </h5>

                        <div style={{ marginTop:"1rem", position:"relative"}}>

                            <div>
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

export default AboutUs;