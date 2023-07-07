import {React, useState} from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";

import {auth} from "../config/firebase";

import password_hide from "../images/hidden.png";
import password_show from "../images/view.png";

const SignUpForm = () => {

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [gender, setGender] = useState("");

    const history = useHistory();

    const register = (() => {
        createUserWithEmailAndPassword(auth, email, password).then(() => {
            alert("Registered Successfully");
            history.push("/login");
        }).catch((error) => {
            console.log(error.message);
        })
    })

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };

    return(
        <div>
            <div className="registration_box">
                <div className="signupform">
            
                    <label className="reg_label">Full Name</label>
                    <input
                        name="fullName"
                        type="text"
                        className="reg_input"
                        placeholder="Full Name"
                        value={fullName}
                        onChange={(event) => setFullName(event.target.value)}
                    />

                    <label className="reg_label" style={{marginLeft:"150px"}}>Email Address</label>
                    <input
                        name="emailAddress"
                        type="email"
                        className="reg_input"
                        placeholder="Email Address"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />         
            
                    <label className="reg_label">Password</label>

                    <div>

                        <input
                            name="password"
                            type={showPassword? "text" : "password"}
                            className="reg_input"
                            placeholder="Password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />

                        <button
                            name="password"
                            type="button"
                            style={{borderStyle:"none", backgroundColor:"unset", marginLeft:"1rem", marginTop:"0rem"}}
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

                    <label className="reg_label">Gender</label>
                    <select
                        name="gender"
                        className="reg_input"
                        defaultValue="Female"
                        value={gender}
                        onChange={(event) => setGender(event.target.value)}
                    >
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                    </select>
                </div>
            </div>

            <div>
                <div style={{marginLeft:"820px", marginTop:"50px"}}>
                    <button type="button"
                    name="sign_up"
                    className="login_button"
                    onClick={register}
                    >
                         <p className="reserve_button_text">Sign Up</p> 
                    </button>
                </div>

                <div className="login_link" style={{marginLeft:"790px"}}>
                    <h6>Have An Account? </h6><div style={{marginLeft:"10px"}}><Link to="/login"  style={{fontSize:"26px", color:"white"}}><h6>Login</h6></Link></div>
                </div>
            </div>

        </div>
    )
};

export default SignUpForm;