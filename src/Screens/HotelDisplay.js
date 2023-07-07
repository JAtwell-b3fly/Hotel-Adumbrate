import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import hotel_logo from "../images/hotel.png";
import profile_button from "../images/profile-user.png";
import wishlist_button from "../images/wishlist.png";
import single_suite_1 from "../images/Hotel Room Couple 1.png";
import rating from "../images/4starrating.png";
import wishlist from "../images/heart.png";
import bed from "../images/bed.png";
import bath from "../images/bathtub.png";
import tv from "../images/television.png";
import ac from "../images/air-conditioner.png";
import back from "../images/back.png";
import map_button from "../images/gps.png";
import logout_button from "../images/log-out.png";

const HotelDisplay = () => {
    const history = useHistory();

    const goBack = (() => {
        history.push("/availablerooms")
    })

    const goToBrowse = (() => {
        history.push("/browse")
    })

    const goToReserveForm = (() => {
        history.push("/reservationform");
    })

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
                            <svg width="50px" height="50px" xmlns="http://www.w3.org/2000/svg">
                                <image href={hotel_logo} height="40px" width="40px" />
                            </svg>
                        </button>
                    </div>

                    <div className="back_button">
                        <button 
                        type="button"
                        name="back_button"
                        style={{borderStyle:"none", backgroundColor:"unset"}}
                        onClick={goBack}>
                            <svg width="50px" height="50px" xmlns="http://www.w3.org/2000/svg">
                                <image href={back} height="40px" width="40px" />
                            </svg>
                        </button>
                    </div>

                    <div className="display_navbar">

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
                
                <div className="displaybox">
            
                    <div className="suite_image_div">
                        <svg width= "100%" height="100%" className="suite_image" xmlns="http://www.w3.org/2000/svg">
                            <image href={single_suite_1} height="100%" width= "100%" />
                        </svg> 
                    </div>

                    <div className="display_description">

                        <div className="Descr_row1">
                            <div style={{marginTop:"10px"}}>
                                <h3 className="suite_name">Single Suite</h3>

                                <div className="room_number">
                                    <p className="room_number">Room 125</p>
                                </div>
                            </div>
                            
                            <div className="rating_wishlist_div">
                                <div className="display_rating">
                                    <svg width= "100%" height="100%" className="display_rating" xmlns="http://www.w3.org/2000/svg">
                                        <image href={rating} height="100%" width= "100%" />
                                    </svg>
                                </div>

                                <div className="wishlist_button_div">
                                    <svg width= "100%" height="30px" className="wishlist_button" xmlns="http://www.w3.org/2000/svg">
                                        <image href={wishlist} height="30px" width= "100%" />
                                    </svg>
                                </div>
                            </div>

                        </div>


                        <div className="perks">
                            <svg width= "20px" height="20px" className="perk_image" xmlns="http://www.w3.org/2000/svg">
                                <image href={bed} height="20px" width= "20px" />
                            </svg>

                            <p className="perk_description">4 Bedroom</p>

                            <svg width= "20px" height="20px" className="perk_image" xmlns="http://www.w3.org/2000/svg">
                                <image href={bath} height="20px" width= "20px" />
                            </svg>

                            <p className="perk_description">3 Bathroom</p>

                            <svg width= "20px" height="20px" className="perk_image" xmlns="http://www.w3.org/2000/svg">
                                <image href={tv} height="20px" width= "20px" />
                            </svg>

                            <p className="perk_description">2 Television</p>

                            <svg width= "20px" height="20px" className="perk_image" xmlns="http://www.w3.org/2000/svg">
                                <image href={ac} height="20px" width= "20px" />
                            </svg>

                            <p className="perk_description">1 Air Conditioning</p>
                        </div>

                        <div className="suite_description_div">
                            <p className="suite_description">This suite is best suited for single travelling people. We cater for those partaking in business trips or vacations. The room is well lighted with
                                an added balcony for those who light to bask in the sunlight on a gorgeous day. Room service is offered as well.
                                asdfajsdfkjasdfklajsdfhlkasjdhfakjsdhfkjsdflkajdhfkjadhsfkjasdhfkajsdfhkajsdf
                                asdkjfahskdjfhaksdjfhalkjdsfhalksdjfhaksjdfhkalsjdfhaklsdjfhalksjdfhlaksjdfhalksjd
                                dskjfaksljdfhakjsdfhkjasdhfkjasdflksdjfl;akjdsflkasjdflkasdjflkasdjfl;aksdjf;laskdfja
                            </p>
                        </div>


                        <div className="price_reservation">
                            <div className="price">
                                <p>
                                    Price
                                </p>
                                <div style={{display:"flex"}}>
                                    <h2>R 10 000</h2> 
                                    <p style={{marginTop:"25px"}}>/night</p>
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
                </div>

            </div>
        </div>
    )
};

export default HotelDisplay;