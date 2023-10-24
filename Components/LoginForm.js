import { React, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import {collection, getDocs} from "firebase/firestore";
import { auth, db } from "../config/firebase"; 

import { signInWithEmailAndPassword } from "firebase/auth";

import password_hide from "../images/hidden.png";
import password_show from "../images/view.png";

const LoginForm = () => {

    const [loginEmailAddress, setLoginEmailAddress] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const handleLogin = async() => {
        //Sign in with email and password
       
        try {
            //Sign in with email and password
            const userCredential = await signInWithEmailAndPassword(auth, loginEmailAddress, loginPassword);
            const user = userCredential.user;

            //Get user data from Firestore based on the email address
            const querySnapShot = await getDocs(collection(db, "users"));

            querySnapShot.forEach((doc) => {
                if (doc.data().emailAddress === loginEmailAddress) {
                    const role = doc.data().role;

                    //Navigate to the appropriate screen based on the user's role
                    if (role === "user") {
                        history.push("/browse");
                        alert("User Login Successful");
                    } else if (role === "admin") {
                        history.push("/adminhome");
                        alert("Admin Login Successful");
                    }
                }
            })
        } catch (error) {
            console.log("Error during login: ", error.message); 
        }
    };

    const history = useHistory();

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };

    return(
        <div> 
            <form>
            <div className="login_box">
                <div className="loginform">
                    
            
                    <div style={{display: "flex", flexDirection:"column"}}>
                    <label className="login_label" style={{color: "white"}}>Email Address</label>
                    <input
                        name="loginEmailAddress"
                        type="email"
                        className="logreg_input"
                        placeholder="Email Address"
                        onChange={(event) => setLoginEmailAddress(event.target.value)}
                    />         
            
                    <label className="login_label"  style={{color: "white"}}>Password</label>

                    <div style={{display:"flex"}}>
                        <input
                            name="loginPassword"
                            type={showPassword? "text" :"password"}
                            className="logreg_input"
                            placeholder="Password"
                            onChange={(event) => setLoginPassword(event.target.value)}
                        />

                        <button
                            name="password"
                            type="button"
                            style={{borderStyle:"none", backgroundColor:"unset", marginLeft:"1rem"}}
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword? 
                                <>
                                    <svg width="2rem" height="2rem" style={{backgroundColor: "rgb(213, 206, 163, 0.25)", borderRadius: "5rem"}}>
                                        <image href={password_hide} height="100%" width="100%" />
                                    </svg>
                                </>
                            :
                                <>
                                    <svg width="2rem" height="2rem" style={{backgroundColor: "rgb(213, 206, 163, 0.25)", borderRadius: "5rem"}}>
                                        <image href={password_show} height="100%" width="100%" />
                                    </svg>
                                </>
                            }    
                        </button>
                    </div>
                    </div>
                    
                </div>
            </div>

            <div style={{marginBottom:"0rem", marginTop:"1rem"}}>
                <div className="login_link" style={{marginTop:"1rem", marginBottom: "1rem", marginLeft: "28rem"}}>
                    <Link to="/forgotpassword" style={{color:"white"}}><h6 className="login_link" style={{backgroundColor: "rgba(0,0,0,0.4)"}}>Forgot Password?</h6></Link>
                </div>

                <div style={{marginLeft:"46rem", marginTop:"1rem"}}>
                    <button type="button"
                    name="login"
                    className="login_button"
                    onClick={handleLogin}
                    >
                    Login
                    </button>

                    
                </div>

                <div className="login_link" style={{marginLeft:"41rem", marginTop:"1rem"}}>
                    <h6 style={{backgroundColor: "rgba(0,0,0,0.4)"}}>Don't Have An Account? </h6><div style={{marginLeft:"1rem"}}><Link to="/signup"  style={{fontSize:"110%", color:"white"}}><h6 style={{backgroundColor: "rgba(0,0,0,0.4)"}}>Sign Up</h6></Link></div>
                </div>
            </div>
            </form>
        </div>
    )
};

export default LoginForm;