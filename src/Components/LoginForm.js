import { React, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import {collection, getDocs} from "firebase/firestore";
import { auth, db } from "../config/firebase"; 
import { signInWithEmailAndPassword } from "firebase/auth";
import * as Yup from "yup";
import { Formik, Field, ErrorMessage, Form} from "formik";

import password_hide from "../images/hidden.png";
import password_show from "../images/view.png";

import Loader from "./Loader";

const LoginForm = () => {

    //const [loginEmailAddress, setLoginEmailAddress] = useState("");
    //const [loginPassword, setLoginPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    /*const handleLogin = async() => {
        //Sign in with email and password
       
        try {
            setIsLoading(true);

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
            setIsLoading(false);
        } catch (error) {
            console.log("Error during login: ", error.message); 
        }
    };*/

    const history = useHistory();

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };

    return(
        
        <div> 
            { isLoading && <Loader />}
            <Formik
                enableReinitialize={true}
                initialValues={{loginEmailAddress: "", loginPassword: ""}}
                validationSchema={Yup.object().shape({
                    loginEmailAddress: Yup.string().email("Invalid email address").required("Email address is required"),
                    loginPassword: Yup.string().required("Password is required"),
                })}
                onSubmit={async (values) => {
                    console.log("Form submitted:", values);
                    try {
                        //Loader should show when form submitting
                        setIsLoading(true);
                        //Sign in with email and password
                        const userCredential = await signInWithEmailAndPassword(auth, values.loginEmailAddress, values.loginPassword);
                        const user = userCredential.user;

                        //Get user data from Firestore based on the email address
                        const querySnapShot = await getDocs(collection(db, "users"));

                        querySnapShot.forEach((doc) => {
                            if (doc.data().emailAddress === values.loginEmailAddress) {
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
                        });
                        setIsLoading(false);
                    } catch (error) {
                        console.log("Error during login: ", error.message);
                        setIsLoading(false);
                    } finally {
                        setIsLoading(false);
                    }
                }}
            >
            
            {() => (
                <>

                    <div className="login_box">
                <Form className="loginform">
                
            
                    <div style={{display: "flex", flexDirection:"column"}}>
                    <label className="login_label" style={{color: "white"}}>Email Address</label>
                    <Field
                        name="loginEmailAddress"
                        type="email"
                        className="logreg_input"
                        placeholder="Email Address"
                        //onChange={(event) => setLoginEmailAddress(event.target.value)}
                    />
                    <ErrorMessage name="loginEmailAddress" component="div" className="error-message" />         
            
                    <label className="login_label"  style={{color: "white"}}>Password</label>

                    <div style={{display:"flex"}}>
                        <Field
                            name="loginPassword"
                            type={showPassword? "text" :"password"}
                            className="logreg_input"
                            placeholder="Password"
                            //onChange={(event) => setLoginPassword(event.target.value)}
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
                    <ErrorMessage name="loginPassword" component="div" className="error-message" />
                    </div>
                    
                </Form>
            </div>

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
                    //onClick={handleLogin}
                    >
                    Login
                    </button>

                    
                </div>

                <div className="login_link" style={{marginLeft:"41rem", marginTop:"1rem"}}>
                    <h6 style={{backgroundColor: "rgba(0,0,0,0.4)"}}>Don't Have An Account? </h6><div style={{marginLeft:"1rem"}}><Link to="/signup"  style={{fontSize:"110%", color:"white"}}><h6 style={{backgroundColor: "rgba(0,0,0,0.4)"}}>Sign Up</h6></Link></div>
                </div>
            </div>

                </>
            )}
            </Formik>
        </div>
    )
};

export default LoginForm;