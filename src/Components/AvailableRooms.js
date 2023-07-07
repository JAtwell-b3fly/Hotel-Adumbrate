import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import room1 from "../images/Hotel Room Family 1.png";
import room1_rating from "../images/4starrating.png";
import pagination from "../images/right-chevron.png";

const AvailableRoomsComp = () => {

    const history = useHistory();

    const goToDisplay = (() => {
        history.push("/display");
    })

    return(
        <div className="available_rooms_box">
            <div style={{display:"flex"}}>
                <div className="rooms_div">
                    <Link to="/display" className="links">

                    <div className="room_image_div">
                        <svg width="100%" height="100%" style={{objectFit:"fill", borderRadius:"40%"}}>
                            <image href={room1} height="100%" width="100%" />
                        </svg>
                    </div>

                    </Link>
                    <div className="rooms_info">
                        <h4>Room 123</h4>

                        <svg width="100%" height="100%" className="rooms_rating">
                            <image href={room1_rating} height="100%" width="100%" />
                        </svg>

                        <p style={{fontSize:"12px"}}>4 Bedrooms, 3 Bathrooms, 2 AC, 1 TV</p>
                        
                        <h2>R 599.99</h2>

                        <div style={{display:"flex"}}>

                            <button
                                className="view_more_button"
                                style={{width:"110px", marginLeft:"50px"}}
                                name="Add To Wishlist Button"
                            >
                                Add To Favourites
                            </button>

                            <button
                                name="View More Button"
                                className="view_more_button"
                                onClick={goToDisplay}
                            >
                                View More
                            </button>
                        </div>
                        
                    </div>

                </div>

                <div className="rooms_div">
                    <Link to="/display" className="links">

                    <div className="room_image_div">

                        <svg width="100%" height="100%" style={{objectFit:"fill", borderRadius:"40%"}}>
                            <image href={room1} height="100%" width="100%" />
                        </svg>
                    </div>

                    </Link>

                    <div className="rooms_info">
                        <h4>Room 123</h4>

                        <svg width="100%" height="100%" className="rooms_rating">
                            <image href={room1_rating} height="100%" width="100%" />
                        </svg>

                        <p style={{fontSize:"12px"}}>4 Bedrooms, 3 Bathrooms, 2 AC, 1 TV</p>
                        
                        <h2>R 599.99</h2>

                        <div style={{display:"flex"}}>

                            <button
                                className="view_more_button"
                                style={{width:"110px", marginLeft:"50px"}}
                                name="Add To Wishlist Button"
                            >
                                Add To Favourites
                            </button>

                            <button
                                name="View More Button"
                                className="view_more_button"
                                onClick={goToDisplay}
                            >
                                View More
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            <div style={{display:"flex"}}>
                <div className="rooms_div">
                    <Link to="/display" className="links">

                    <div className="room_image_div">
                        <svg width="100%" height="100%" style={{objectFit:"fill", borderRadius:"40%"}}>
                            <image href={room1} height="100%" width="100%" />
                        </svg>
                    </div>

                    </Link>

                    <div className="rooms_info">
                        <h4>Room 123</h4>

                        <svg width="100%" height="100%" className="rooms_rating">
                            <image href={room1_rating} height="100%" width="100%" />
                        </svg>

                        <p style={{fontSize:"12px"}}>4 Bedrooms, 3 Bathrooms, 2 AC, 1 TV</p>
                        
                        <h2>R 599.99</h2>

                        <div style={{display:"flex"}}>

                            <button
                                className="view_more_button"
                                style={{width:"110px", marginLeft:"50px"}}
                                name="Add To Wishlist Button"
                            >
                                Add To Favourites
                            </button>

                            <button
                                name="View More Button"
                                className="view_more_button"
                                onClick={goToDisplay}
                            >
                                View More
                            </button>
                        </div>
                    </div>
                </div>

                <div className="rooms_div">
                    <Link to="/display" className="links">

                    <div className="room_image_div">
                        <svg width="100%" height="100%" style={{objectFit:"fill", borderRadius:"40%"}}>
                            <image href={room1} height="100%" width="100%" />
                        </svg>
                    </div>

                    </Link>

                    <div className="rooms_info">
                        <h4>Room 123</h4>

                        <svg width="100%" height="100%" className="rooms_rating">
                            <image href={room1_rating} height="100%" width="100%" />
                        </svg>

                        <p style={{fontSize:"12px"}}>4 Bedrooms, 3 Bathrooms, 2 AC, 1 TV</p>
                        
                        <h2>R 599.99</h2>
                        
                        <div style={{display:"flex"}}>

                            <button
                                className="view_more_button"
                                style={{width:"110px", marginLeft:"50px"}}
                                name="Add To Wishlist Button"
                            >
                                Add To Favourites
                            </button>

                            <button
                                name="View More Button"
                                className="view_more_button"
                                onClick={goToDisplay}
                            >
                                View More
                            </button>
                        </div>
                    </div>
                </div>

                <div>
                    <svg width="100%" height="100%" className="rooms_rating" style={{marginTop:"300px"}}>
                        <image href={pagination} height="100%" width="100%" />
                    </svg>
                </div>
            </div>
            
        </div>
    )
};

export default AvailableRoomsComp;