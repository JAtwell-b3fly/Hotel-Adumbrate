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
                        <svg width="2.5rem" height="2.5rem" xmlns="http://www.w3.org/2000/svg">
                            <image href={hotel_logo} height="100%" width="100%" />
                        </svg>
                    </div>
                    <div className="hotel_name">
                        <h3 className="hotel_name">Hotel Adumbrate</h3>
                    </div>
                </div>

                <div className="hotel_slogan_box_effect">
                    <h3 className="hotel_slogan">Experience The Perfect Stay</h3>
                </div>

                <div style={{marginTop:"3rem"}}>
                    <button type="button"
                            name="sign_up"
                            className="sign_up_button"
                            style={{marginLeft:"45rem"}}
                            onClick={goToSignUp}
                    >Sign Up</button>
                </div>

                <div className="login_link" style={{backgroundColor: "rgba(0,0,0, 0.4)"}}>
                    <h6 className="login_link">Already Have An Account? </h6><div style={{marginLeft:"1rem"}}><Link to="/login" style={{color:"rgba(255,255,255)"}}><h6 className="login_link" style={{marginLeft:"1rem"}}>Login</h6></Link></div>
                </div>
            </div>
        </div>
    )
};

export default Home;