import { React, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../config/firebase";

import password_hide from "../images/hidden.png";
import password_show from "../images/view.png";

const LoginForm = () => {

    const history = useHistory();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const goToBrowse = (() => {
        signInWithEmailAndPassword(auth, email, password).then(() => {
            alert("Login Successful");
            history.push("/browse");
        }).catch((error) => {
    
        })
    })

    const goToAdminHome = (() => {
        signInWithEmailAndPassword(auth, email, password).then(() => {
            alert("Login Successful");
            history.push("/login/adminhome");
        }).catch((error) => {

        })
    })

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };

    return(
        <div> 
            <div className="login_box">
                <div className="loginform">
            
                    <label className="login_label">Email Address</label>
                    <input
                        name="emailAddress"
                        type="email"
                        className="logreg_input"
                        placeholder="Email Address"
                        onChange={(event) => setEmail(event.target.value)}
                    />         
            
                    <label className="login_label" style={{marginLeft:"165px"}}>Password</label>

                    <div style={{display:"flex"}}>
                        <input
                            name="password"
                            type={showPassword? "text" :"password"}
                            className="logreg_input"
                            placeholder="Password"
                            onChange={(event)=> setPassword(event.target.value)}
                        />

                        <button
                            name="password"
                            type="button"
                            style={{borderStyle:"none", backgroundColor:"unset", marginLeft:"1rem"}}
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword? 
                                <>
                                    <svg width="40px" height="40px" xmlns="http://www.w3.org/2000/svg">
                                        <image href={password_hide} height="50px" width="30px" />
                                    </svg>
                                </>
                            :
                                <>
                                    <svg width="40px" height="40px" xmlns="http://www.w3.org/2000/svg">
                                        <image href={password_show} height="50px" width="30px" />
                                    </svg>
                                </>
                            }    
                        </button>
                    </div>
                </div>
            </div>

            <div>
                <div className="login_link" style={{marginLeft:"820px"}}>
                    <Link to="/forgotpassword" style={{fontSize:"26px", color:"white"}}><h6>Forgot Password?</h6></Link>
                </div>

                <div style={{marginLeft:"700px"}}>
                    <button type="button"
                    name="login"
                    className="login_button"
                    onClick={goToBrowse}
                    >
                    <p className="reserve_button_text">Login</p>
                    </button>

                    <button type="button"
                    name="admin_login"
                    className="admin_login_button"
                    onClick={goToAdminHome}
                    >
                     <p className="reserve_button_text">Admin Login</p>
                    </button>
                </div>

                <div className="login_link">
                    <h6>Don't Have An Account? </h6><div style={{marginLeft:"10px"}}><Link to="/signup"  style={{fontSize:"26px", color:"white"}}><h6>Sign Up</h6></Link></div>
                </div>
            </div>

        </div>
    )
};

export default LoginForm;