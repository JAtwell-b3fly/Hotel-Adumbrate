import {React, useState} from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { db } from "../config/firebase";
import { collection, addDoc, doc, setDoc } from "firebase/firestore"; 

import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import {auth} from "../config/firebase";

import password_hide from "../images/hidden.png";
import password_show from "../images/view.png";

import Loader from "./Loader";

const SignUpForm = () => {

    const [regFullName, setRegFullName] = useState("");
    const [regEmailAddress, setRegEmailAddress] = useState("");
    const [regGender, setRegGender] = useState("Female");
    const [regPassword, setRegPassword] = useState("");
    const [regPhysicalAddress, setRegPhysicalAddress] = useState("");
    const [role, setRole] = useState("user");
    const [isLoading, setIsLoading] = useState(false);

    const history = useHistory();

    const formValidation = () => {

        if (!regFullName || regFullName.length > 50) {
            alert("Full name is required and must be shorter than 50 characters")
            return false;
        }

        else if (!regEmailAddress || !/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(regEmailAddress) || !(regEmailAddress.endsWith('.co.za') || regEmailAddress.endsWith('.org.za') || regEmailAddress.endsWith('.com'))) {
            alert("Email Address is required, must contain the @ symbol and end it either three ways: .co.za, .org.za or .com")
            return false;
        }

        else if (!regPhysicalAddress || regPhysicalAddress.length > 50) {
            alert("Physical Address is required and must be shorter than 50 characters")
            return false;
        }

        else if (!["Male", "Female"].includes(regGender)) {
            alert("Please choose a gender")
            return false;
        }

        else if (!regPassword || regPassword.length < 6 || !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(regPassword)) {
            console.log("Password validation failed");
            alert("Password is required and must be at least 6 characters, containing special characters, lowercase and uppercase characters and numbers");
            return false;
        }
    
        return true;
    }

    const register = (async() => {

        if (!formValidation()) {
            setIsLoading(false);
            return;
        }

        setIsLoading(true);

        createUserWithEmailAndPassword(auth, regEmailAddress, regPassword).then(async() => {
                try {
                    const auth = getAuth();
                    const user = auth.currentUser;
                    const userId = user.uid;

                    if (user && user.uid) {
                        const userDocRef = doc(db, "users", regEmailAddress);
                        await setDoc(userDocRef, {
                            fullName: regFullName,
                            emailAddress: regEmailAddress,
                            gender: regGender,
                            physicalAddress: regPhysicalAddress,
                            password: regPassword,
                            userID: userId, 
                            role: "user",
                        })
                        setIsLoading(false);
                        alert("Registration Successful");
                        history.push("/login");
                    }
                } catch (error) {
                    console.error(error.message);
                }
            
                //Reset Form Inputs
                setRegFullName("");
                setRegEmailAddress("");
                setRegGender("");
                setRegPassword("");
                setRegPhysicalAddress("");
                setRole("");
        })
        
    })

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };

    return(
        <div>
            <form onSubmit={register}>
                {isLoading ?
                (
                <Loader />
                )
                :
                (
                    <>
                    <div className="registration_box">
                <div className="signupform">
            
                    <label className="reg_label"   style={{color: "white", marginLeft: "10rem"}}>Full Name</label>
                    <input
                        name="regFullName"
                        type="text"
                        className="reg_input"
                        placeholder="Full Name"
                        onChange={(event) => setRegFullName(event.target.value)}
                    />

                    <label className="reg_label" style={{marginLeft:"9.2rem", color: "white"}}>Email Address</label>
                    <input
                        name="regEmailAddress"
                        type="email"
                        className="reg_input"
                        placeholder="Email Address"
                        onChange={(event) => setRegEmailAddress(event.target.value)}
                    />         
            
                    <label className="reg_label"   style={{color: "white", marginLeft: "10rem"}}>Password</label>

                    <div>

                        <input
                            name="regPassword"
                            type={showPassword? "text" : "password"}
                            className="reg_input"
                            placeholder="Password"
                            onChange={(event) => setRegPassword(event.target.value)}
                        />

                        <button
                            name="password"
                            type="button"
                            style={{borderStyle:"none", backgroundColor:"unset", marginLeft:"1rem", marginTop:"0rem"}}
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword? 
                                <>
                                    <svg width="2rem" height="2rem">
                                        <image href={password_hide} height="100%" width="100%" />
                                    </svg>
                                </>
                            :
                                <>
                                    <svg width="2rem" height="2rem">
                                        <image href={password_show} height="100%" width="100%" />
                                    </svg>
                                </>
                            }    
                        </button>
                    </div>

                    <label className="reg_label"   style={{color: "white"}}>Gender</label>
                    <select
                        name="regGender"
                        onChange={(event) => setRegGender(event.target.value)}
                        defaultValue="Female"
                        className="reg_input"
                    >
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                    </select>

                    <label className="reg_label" style={{marginLeft:"8.4rem", color: "white"}}>Physical Address</label>
                    <input
                        name="regPhysicalAddress"
                        type="text"
                        className="reg_input"
                        placeholder="Physical Address"
                        onChange={(event) => setRegPhysicalAddress(event.target.value)}
                    />
                    
                </div>
            </div>

            <div>
                <div style={{marginLeft:"45rem", marginTop:"1rem"}}>
                    <button type="submit"
                    name="sign_up"
                    className="login_button"
                    onClick={register}
                    >
                         Sign Up
                    </button>
                </div>

                <div className="login_link" style={{marginLeft:"42rem"}}>
                    <h6 style={{backgroundColor: "rgba(0,0,0,0.3)"}}>Have An Account? </h6><div style={{marginLeft:"1rem"}}><Link to="/login"  style={{fontSize:"110%", color:"white"}}><h6 style={{backgroundColor: "rgba(0,0,0,0.3)"}}>Login</h6></Link></div>
                </div>
            </div>
                    </>
                )}
            </form>
        </div>
    )
};

export default SignUpForm;