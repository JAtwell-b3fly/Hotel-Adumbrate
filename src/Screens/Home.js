import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import hotel_logo from "../images/hotel.png";

const Home = () => {

    const history = useHistory();

    const goToSignUp = (() => {
        history.push("/signup");
    })

    return(
        <div className="Home">
            <div className="home_background_image">
                <div className="hotel_stamp">

                    <div className="hotel_logo">
                        <svg width="50px" height="50px" xmlns="http://www.w3.org/2000/svg">
                            <image href={hotel_logo} height="40px" width="40px" />
                        </svg>
                    </div>
                    <div className="hotel_name">
                        <h3>Hotel Adumbrate</h3>
                    </div>
                </div>

                <div className="hotel_slogan_box_effect">
                    <h3 style={{color: "white", opacity:"1"}}>Experience The Perfect Stay</h3>
                </div>

                <div>
                    <button type="button"
                            name="sign_up"
                            className="sign_up_button"
                            style={{marginLeft:"800px"}}
                            onClick={goToSignUp}
                    >Sign Up</button>
                </div>

                <div className="login_link">
                    <h6>Already Have An Account? </h6><div style={{marginLeft:"10px"}}><Link to="/login" style={{fontSize:"26px", color:"white"}}><h6>Login</h6></Link></div>
                </div>
            </div>
        </div>
    )
};

export default Home;