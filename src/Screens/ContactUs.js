import {React, useState} from "react";
import { Link } from "react-router-dom";
import { db } from "../config/firebase"; 
import { collection, addDoc } from "firebase/firestore";
import { useHistory } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

import hotel_logo from "../images/hotel.png";
import profile_button from "../images/profile-user.png";
import wishlist_button from "../images/wishlist.png";
import hotel_image from "../images/Hotel Room Single 4.png";
import about_us from "../images/information-button.png";
import logout_button from "../images/log-out.png";
import contact from "../images/telephone.png";
import contact_us from "../images/telephone.png";
import mail_button from "../images/mail.png";
import address_button from "../images/gps.png";

const ContactUs = () => {

    const [contactName, setContactName] = useState("");
    const [contactEmail, setContactEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [messages, setMessages] = useState("");

    const history = useHistory();

    const goToBrowse = (() => {
        history.push("/browse")
    });

    const addContact = (async() => {
        const auth = getAuth();
        const user = auth.currentUser;
        const docRef = await addDoc(collection(db, "contactReq"), {
            contactName: contactName,
            contactEmail: contactEmail,
            subject: subject,
            messages: messages,
          }).then((docRef) => {
            const docId = docRef.id;
            console.log(docId);
        }).catch((err) => {
            console.log("Error" + err.message);
        })
        alert("Contact Request Sent");

        setContactName("");
        setContactEmail("");
        setSubject("");
        setMessages("");
    })

    const Logout = (() => {
        const auth = getAuth();
        signOut(auth).then(() => {
            history.push("/");
            alert("You are Logged Out");
        }).catch((error) => {
            console.error("You could not be logged out", error);
        })
    });

    return(
        <div className="Browse">
            <div className="background_image">
                <div className="hotel_stamp">

                    <div className="hotel_logo">
                        <button
                        style={{borderStyle:"none", backgroundColor:"unset"}}
                        onClick={goToBrowse}
                        >
                            <svg width="2.5rem" height="2.5rem">
                                <image href={hotel_logo} height="100%" width="100%" />
                            </svg>
                        </button>
                    </div>

                    <div className="display_navbar" style={{marginLeft:"69rem", width: "10.5rem"}}>

                    <Link to ="/aboutus"  style={{height:"2.9rem", width:"2.5rem"}}>
                            <svg width="2.5rem" height="2.5rem">
                                <image href={about_us} height="100%" width="100%" />
                            </svg>
                        </Link>

                        <Link to ="/contactus"  style={{height:"2.9rem", width:"2.5rem"}}>
                            <svg width="2.5rem" height="2.5rem">
                                <image href={contact_us} height="100%" width="100%" />
                            </svg>
                        </Link>

                        {/*<Link to="/wishlist" style={{height:"2.9rem", width:"2.5rem"}}>
                            <svg width="2.5rem" height="2.5rem">
                                <image href={wishlist_button} height="100%" width="100%" />
                            </svg>
                        </Link>*/}

                        <Link to="/profile" style={{height:"2.9rem", width:"2.5rem"}}>
                            <svg width="2.5rem" height="2.5rem">
                                <image href={profile_button} height="100%" width="100%" />
                            </svg> 
                        </Link>

                        <button
                        style={{borderStyle:"none", backgroundColor:"unset"}}
                        onClick={Logout}
                        >
                            <svg width="2.5rem" height="2.5rem">
                                <image href={logout_button} height="100%" width="100%" />
                            </svg> 
                        </button>
                    </div>

                </div>
                
                <div className="contact_box">
                    <div>
                        <svg width="32rem" height="32rem" style={{ borderRadius:"9%", objectFit:"fill"}}>
                            <image href={hotel_image} height="100%" width="100%" />
                        </svg>
                    </div>

                    <div style={{width:"40rem", marginLeft:"10%", marginTop:"1rem"}}>
                        <h2 style={{fontFamily: 'Cinzel', fontStyle:"oblique", color:"white"}}>Contact Us</h2>
                        <p style={{textAlign:"justify",fontFamily: 'Cinzel', color:"white", fontSize:"90%"}}>Our guests are the heart of our hotels. Your feedback is important to us, please call or mail us using the details below. Alternatively, 
                            you can complete the contact form below and we’ll get back to you.</p>

                        <div>
                            <form onSubmit={addContact}>
                                <div style={{display:"flex"}}>
                                <div style={{display:"flex", flexDirection:"column"}}>
                                    <label className="contact_label">Your Full Name</label>
                                    <label className="contact_label">Your Email Address</label>
                                    <label className="contact_label">Subject</label>
                                    <label className="contact_label">Your Message (optional)</label>
                                </div>

                                <div style={{display:"flex", flexDirection:"column"}}>
                                    <input
                                        name="name"
                                        type="text"
                                        className="contact_us_input"
                                        placeholder="Your Full Name"
                                        value={contactName}
                                        onChange={(event) => setContactName(event.target.value)}
                                    />

                                    <input
                                        name="email"
                                        type="email"
                                        className="contact_us_input"
                                        placeholder="Your Email Address"
                                        value={contactEmail}
                                        onChange={(event) => setContactEmail(event.target.value)}
                                    />
                                
                                    <input
                                        name="subject"
                                        type="text"
                                        className="contact_us_input"
                                        placeholder="Enter Subject"
                                        value={subject}
                                        onChange={(event) => setSubject(event.target.value)}
                                    />
                                    
                                    <input
                                        name="messages"
                                        type="text"
                                        className="contact_us_input"
                                        placeholder="Type Your Message"
                                        style={{height: "5rem"}}
                                        value={messages}
                                        onChange={(event) => setMessages(event.target.value)}
                                    />
                                </div>

                                <div style={{display:"flex", flexDirection:"column"}}>
                                    <button 
                                        type="button"
                                        className="contact_submit_button"
                                        onClick={addContact}
                                    >
                                        <p className="contact_button_text">Submit</p>
                                    </button>
                                </div>
                            </div>

                                <div>
                                    
                                </div>

                            </form>
                        </div>

                        <div style={{display: "flex", marginTop:"1rem"}}>
                            <div style={{width:"15rem"}}>
                                <div style={{display:"flex"}}>
                                <svg width="2.5rem" height="2.5rem" style={{backgroundColor: "whitesmoke", borderRadius: "50rem"}}>
                                    <image href={contact} height="100%" width="100%" />
                                </svg>
                                <h6 className="contact_icon_text">Phone</h6>
                                </div>
                                <p className="contact_icon_text">+ 27 053 873 1564</p>
                            </div>

                            <div style={{width:"15rem"}}>
                            <div style={{display:"flex"}}>
                                <svg width="2.5rem" height="2.5rem" style={{backgroundColor: "whitesmoke", borderRadius: "50rem"}}>
                                    <image href={mail_button} height="100%" width="100%" />
                                </svg>
                                <h6 className="contact_icon_text">Email</h6>
                                </div>
                                <p className="contact_icon_text">info@hoteladumbrate.co.za</p>
                            </div>

                            <div style={{width:"15rem"}}>
                            <div style={{display:"flex"}}>
                                <svg width="2.5rem" height="2.5rem" style={{backgroundColor: "whitesmoke", borderRadius: "50rem"}}>
                                    <image href={address_button} height="100%" width="100%" />
                                </svg>
                                <h6 className="contact_icon_text">Address</h6>
                                </div>
                                <p className="contact_icon_text">58 The Old Road</p>
                            </div>
                        </div>
                    </div>

                    

                </div>

            </div>
        </div>
    )
};

export default ContactUs;