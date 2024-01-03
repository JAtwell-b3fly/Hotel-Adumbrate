import { React, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { getDoc, doc} from "firebase/firestore";
import { auth, db } from "../config/firebase"; 
import { signInWithEmailAndPassword } from "firebase/auth";

import password_hide from "../images/hidden.png";
import password_show from "../images/view.png";

import Loader from "./Loader";

const LoginForm = () => {

    const [loginEmailAddress, setLoginEmailAddress] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const formValidation = () => {
        if (!loginEmailAddress || !/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(loginEmailAddress) || !(loginEmailAddress.endsWith('.co.za') || loginEmailAddress.endsWith('.org.za') || loginEmailAddress.endsWith('.com'))) {
            alert("Email Address is required, must contain the @ symbol and end it either three ways: .co.za, .org.za or .com")
            return false;
        }

        else if (!loginPassword /*|| loginPassword.length > 6 || !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(loginPassword)*/){
            alert("Password is required and must be at least 6 characters, containing special characters, lowercase and uppercase characters and numbers")
            return false;
        }
    
        return true;
    }

    const handleLogin = async() => {
        //Sign in with email and password
       
        try {
            if (!formValidation()) {
                //setIsLoading(false);
                return;
            }
            setIsLoading(true);

            // Sign in with email and password
            const userCredential = await signInWithEmailAndPassword(auth, loginEmailAddress, loginPassword);
            const user = userCredential.user;

            // Get user role from Firestore
        const userDocRef = doc(db, "users", loginEmailAddress);
        const userDoc = await getDoc(userDocRef);

        // Log userDoc to check its value
        console.log("User Document:", userDoc);

        if (userDoc.exists()) {
            const userData = userDoc.data();
        
            // Fetch additional user information
            const userInfoDocRef = doc(db, "users", user.email);
            const userInfoDocSnap = await getDoc(userInfoDocRef);
        
            if (userInfoDocSnap.exists()) {
                const userInfoData = userInfoDocSnap.data();
                // Do something with the user data, for example, set it in the state
                console.log("User Data:", userInfoData);
        
                // Extract userRole after fetching additional user information
                const userRole = userInfoData && userInfoData.role;
        
                // Navigate to the appropriate screen based on the user's role
                if (userRole === "user") {
                    history.push("/browse");
                    alert("User Login Successful");
                } else if (userRole === "admin") {
                    history.push("/adminhome");
                    alert("Admin Login Successful");
                } else {
                    console.error("Invalid user role");
                    alert("Invalid user role");
                }
            } else {
                console.log("No additional user information found");
            }
        } else {
            console.error("User not found in Firestore");
            alert("Invalid email or password");
        }
            setIsLoading(false);

            //Reset Form Inputs
            setLoginEmailAddress("");
            setLoginPassword("");
        } catch (error) {
            console.log("Error during login: ", error.message);
            
            if (error.code === "auth/wrong-password" || error.code === "auth/user-not-found") {
                setIsLoading(false);
                alert("Invalid Email and Password. Try Again.");
            } else {
                setIsLoading(false);
                alert("An error occurred during login. Please try again.");
            }
            setIsLoading(false);
        }
    };

    const history = useHistory();

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };

    return(
        
        <div> 
            <form onSubmit={handleLogin}>
            {isLoading && <Loader style={{justifyContent: "center"}} /> }
            
                {!isLoading && (
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
                </div>)}
            

            <div style={{marginBottom:"0rem", marginTop:"1rem"}}>
                <div className="login_link" style={{marginTop:"1rem", marginBottom: "1rem", marginLeft: "28rem"}}>
                    <Link to="/forgotpassword" style={{color:"white"}}><h6 className="login_link" style={{backgroundColor: "rgba(0,0,0,0.4)"}}>Forgot Password?</h6></Link>
                </div>

                <div style={{marginLeft:"46rem", marginTop:"1rem"}}>
                    <button 
                    type="submit"
                    name="login"
                    className="login_button"
                    disabled={isLoading}
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