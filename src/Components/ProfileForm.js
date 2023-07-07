import React from "react";
import { Link } from "react-router-dom";

import edit from "../images/pencil.png";
import delete_btn from "../images/recycle-bin.png";
import save from "../images/checked.png";

const ProfileForm = () => {
    return(
        <div>
            <div className="profile_box">
                <div className="profileform">
            
                    <label className="profile_label">Full Name</label>
                    <input
                        name="fullName"
                        type="text"
                        className="profile_input"
                        placeholder="Full Name"
                    />         
            
                    <label className="profile_label">Email Address</label>
                    <input
                        name="emailAddress"
                        type="email"
                        className="profile_input"
                        placeholder="Email Address"
                    />

                    <label className="profile_label">Password</label>
                    <input
                        name="password"
                        type="password"
                        className="profile_input"
                        placeholder="Password"
                    />

                    <label className="profile_label">Gender</label>
                    <select
                        name="gender"
                        className="profile_input"
                        defaultValue="Female"
                    >
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                    </select>


                    <div className="profile_buttons_div">

                        <svg width= "40px" height="40px" className="perk_image" xmlns="http://www.w3.org/2000/svg">
                            <image href={edit} height="40px" width= "40px" />
                        </svg>

                        <svg width= "40px" height="40px" className="perk_image" xmlns="http://www.w3.org/2000/svg">
                            <image href={delete_btn} height="40px" width= "40px" />
                        </svg>
                        
                        <svg width= "40px" height="40px" className="perk_image" xmlns="http://www.w3.org/2000/svg">
                            <image href={save} height="40px" width= "40px" />
                        </svg>

                    </div>

                </div>

            </div>

            <div>
                

            </div>

        </div>
    )
};

export default ProfileForm;