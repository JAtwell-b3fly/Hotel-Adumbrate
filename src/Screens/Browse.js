import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import hotel_logo from "../images/hotel.png";
import appointment_button from "../images/appointment.png";
import profile_button from "../images/profile-user.png";
import wishlist_button from "../images/wishlist.png";
import single from "../images/man.png";
import couple from "../images/couple-silhouette.png";
import family from "../images/together.png";
import hotel_image from "../images/Hotel Adumbrate.jpg";
import map_button from "../images/gps.png";
import logout_button from "../images/log-out.png";

const Browse = () => {

    const history = useHistory();

    const goToBrowse = (() => {
        history.push("/browse")
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
                            <svg width="50px" height="50px" xmlns="http://www.w3.org/2000/svg">
                                <image href={hotel_logo} height="40px" width="40px" />
                            </svg>
                        </button>
                    </div>

                    <div style={{marginLeft:"0px", marginTop:"10px"}}>
                        <h3  className="browse_welcome">Hi Jasmin, Let us help you find your preferred stay</h3>
                    </div>

                    <div className="search_bar_div" style={{marginTop:"14px"}}>
                        <input name="searchbar"
                                type="text"
                                className="searchbar"
                                placeholder="Search here..."
                        />
                </div>

                    <div className="navbar" style={{marginLeft:"0px",marginTop:"14px"}}> 

                        <Link to ="https://www.google.co.za/maps/place/Basilica+Cathedral+of+Saint+Denis/@48.9354313,2.3572644,17z/data=!4m14!1m7!3m6!1s0x47e66eb312fc18bd:0xf2ffbe58c6ffe57c!2sBasilica+Cathedral+of+Saint+Denis!8m2!3d48.9354278!4d2.3598393!16zL20vMGhrYjg!3m5!1s0x47e66eb312fc18bd:0xf2ffbe58c6ffe57c!8m2!3d48.9354278!4d2.3598393!16zL20vMGhrYjg?entry=ttu"  style={{height:"50px", width:"40px"}}>
                            <svg width="50px" height="50px" xmlns="http://www.w3.org/2000/svg">
                                <image href={map_button} height="40px" width="40px" />
                            </svg>
                        </Link>

                        <Link to="/wishlist" style={{height:"50px", width:"40px"}}>
                            <svg width="50px" height="50px" xmlns="http://www.w3.org/2000/svg">
                                <image href={wishlist_button} height="40px" width="40px" />
                            </svg>
                        </Link>

                        <Link to="/profile" style={{height:"50px", width:"40px"}}>
                            <svg width="50px" height="50px" xmlns="http://www.w3.org/2000/svg">
                                <image href={profile_button} height="40px" width="40px" />
                            </svg> 
                        </Link>

                            <svg width="50px" height="50px" xmlns="http://www.w3.org/2000/svg">
                                <image href={logout_button} height="40px" width="40px" />
                            </svg> 

                    </div>

                </div>

                <div className="types" style={{marginLeft:"110px"}}>
                    <h3>Types</h3>
                </div>
                
                <div className="types_suites">
                    <div>

                        <div style={{display:"flex", flexDirection:"column"}}>
                            <div className="type_background">
                                <Link to="/availablerooms" className="links">
                        
                                <svg width="70px" height="70px" style={{marginTop:"15px"}} xmlns="http://www.w3.org/2000/svg">
                                    <image href={single} height="70px" width="70px" />
                                </svg>

                                <h4>Single</h4>
                        
                                </Link>
                            </div>
                        </div>

                        <div style={{display:"flex", flexDirection:"column"}}>
                            <div className="type_background">
                                <Link to="/availablerooms" className="links">

                                <svg width="70px" height="70px" style={{marginTop:"15px"}} xmlns="http://www.w3.org/2000/svg">
                                    <image href={couple} height="70px" width="70px" />
                                </svg>

                                <h4>Couple</h4>

                                </Link>
                            </div>
                        </div>

                        <div style={{display:"flex", flexDirection:"column"}}>
                            <div className="type_background">
                                <Link to="/availablerooms" className="links">
                        
                                <svg width="70px" height="70px" style={{marginTop:"15px"}} xmlns="http://www.w3.org/2000/svg">
                                    <image href={family} height="70px" width="70px" />
                                </svg>

                                <h4>Family</h4>

                                </Link>
                            </div>
                        </div>

                        </div>

                            <div style={{width:"15rem", marginLeft:"10%", marginTop:"30px"}}>
                                <p style={{textAlign:"justify",fontFamily: 'Cinzel', fontStyle:"oblique"}}>We pride ourselves on our wide selection of suites to suite your personal needs. Choosing a suite will allow us to provide all our selections per suite chosen.
                                <br /><br />
                                We cater for people who are on business trips or single travelors.
                                <br /><br />
                                We cater for couples travelling together on vacation, celebrating anniversaries, weddings and so much more.
                                <br /><br />
                                W also cater for families travelling on vacation as well. Providing facilities specially for the little ones to express themselves without any restrictions within those spaces.</p>
                            </div>

                    <div>
                        <div>
                            <svg width="550px" height="800px" style={{marginLeft:"0", borderRadius:"9%", objectFit:"fill"}}>
                                <image href={hotel_image} height="550px" width="690px" />
                            </svg>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
};

export default Browse;