import {React, useState, useEffect} from "react";
import { db } from "../config/firebase";
import { doc, setDoc, getDoc, deleteDoc } from "firebase/firestore"; 
import { getAuth, deleteUser } from "firebase/auth";
import { useHistory } from "react-router-dom";

import edit from "../images/pencil.png";
import delete_btn from "../images/recycle-bin.png";
import save from "../images/checked.png";

import Loader from "./Loader";

const ProfileForm = ({profileFullName, profileNameEdit, profileEmailAddress, profileEmailEdit, profileGender, profileGenderEdit, profilePhysicalAddress, profileAddressEdit, handleProfileFullNameChange, handleProfileEmailAddressChange, handleProfileGenderChange, handleProfilePhysicalAddressChange}) => {

    const history = useHistory();
    const [isdisplay, setIsDisplay] = useState(true);
    const [userInfo, setUserInfo] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const isHandleDisplay = () => {
        if (isdisplay === true) {
            setIsDisplay(false)
        } else {
            setIsDisplay(true)
        }
    } 

    const auth = getAuth();
    const user = auth.currentUser;

    const addProfile = (async() => {
        setIsLoading(true)
        try {
            if(user && user.uid) {
                const userDocRef = doc(db, "users", user.email);
                await setDoc(userDocRef, {
                    fullName: profileNameEdit !== "" ? profileNameEdit : userInfo.fullName,
                    emailAddress: profileEmailEdit !== "" ? profileEmailAddress : userInfo.emailAddress,
                    gender: profileGenderEdit !== "" ? profileGenderEdit: userInfo.gender,
                    physicalAddress: profileAddressEdit !== "" ? profileAddressEdit: userInfo.physicalAddress,
                    role: userInfo.role,
                })
                setIsLoading(false)
                alert("User Information updated");
                setIsDisplay(true);
                
            }
            
        } catch (error) {
            console.log("Error" + error.message);
        }
    });


    useEffect(() => {
        getProfile();
    }, []);

    const getProfile = (async() => {
        if (user) {
            setIsLoading(true)
            try {
                const userDocRef = doc(db, "users", user.email);
                const docSnap = await getDoc(userDocRef);

                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    setUserInfo(userData);
                } else {
                    console.log("No such document exists")
                }
            setIsLoading(false)
            } catch (error) {
                console.error("Error the user information: ", error.message)
            }
        }
    })

    return(
        <div>
            <form>
                {isLoading ?
                (
                    <Loader />
                )
                :
                (
                    <>
                    <div className="profile_box">

{
    isdisplay ?

    <>
        <div className="profile_display">

            <label className="profile_label" style={{color: "white"}}>Full Name</label>
            <div style={{height:"3.2rem", width:"35rem", backgroundColor:"whitesmoke", borderRadius:"5rem", marginBottom:"0.5rem"}}>
                <p style={{color:"black", fontFamily:"Cinzel", fontSize:"80%", textAlign:"center", paddingTop:"0.6rem", fontWeight:"500"}}>{userInfo.fullName}</p>
            </div>        

            <label className="profile_label" style={{marginLeft:"14.5rem", color: "white"}}>Email Address</label>
            <div style={{height:"3rem", width:"35rem", backgroundColor:"whitesmoke", borderRadius:"5rem", marginBottom:"0.5rem"}}>
                <p style={{color:"black", fontFamily:"Cinzel", fontSize:"80%", textAlign:"center", paddingTop:"0.6rem", fontWeight:"500"}}>{userInfo.emailAddress}</p>
            </div>

            <label className="profile_label" style={{color: "white"}}>Gender</label>
            <div style={{height:"3rem", width:"35rem", backgroundColor:"whitesmoke", borderRadius:"5rem", marginBottom:"1rem"}}>
                <p style={{color:"black", fontFamily:"Cinzel", fontSize:"80%", textAlign:"center", paddingTop:"0.6rem", fontWeight:"500"}}>{userInfo.gender}</p>
            </div>

            <label className="profile_label" style={{marginLeft:"14.5rem", color: "white"}}>Physical Address</label>
            <div style={{height:"3rem", width:"35rem", backgroundColor:"whitesmoke", borderRadius:"5rem", marginBottom:"1rem"}}>
                <p style={{color:"black", fontFamily:"Cinzel", fontSize:"80%", textAlign:"center", paddingTop:"0.6rem", fontWeight:"500"}}>{userInfo.physicalAddress}</p>
            </div>


            <div className="profile_buttons_div">

                <div style={{display:"flex", flexDirection:"column", marginLeft: "4rem"}}>
                    <button
                        type="button"
                        style={{borderStyle:"none", backgroundColor:"unset"}}
                        onClick={() => isHandleDisplay(!isdisplay)}
                    >
                        <svg width= "2.7rem" height="2.7rem" className="perk_image" style={{backgroundColor: "whitesmoke", borderRadius: "15rem"}}>
                            <image href={edit} height="100%" width= "100%" />
                        </svg>
                            <p className="contact_icon_text" style={{color: "white"}}>Update</p>
                    </button>
                </div>

            </div>

        </div>
    </>

    :

    <>
        <div className="profileform">

            <label className="profile_label" style={{color: "white"}}>Full Name</label>
            <input
                name="profileNameEdit"
                type="text"
                onChange={handleProfileFullNameChange}
                className="profile_input"
                placeholder="Full Name"
            />         

            <label className="profile_label" style={{marginLeft:"14.5rem", color: "white"}}>Email Address</label>
            <input
                name="profileEmailEdit"
                type="email"
                onChange={handleProfileEmailAddressChange}
                className="profile_input"
                placeholder="Email Address"
            />

            <label className="profile_label" style={{color: "white"}}>Gender</label>
            <select
                name="profileGenderEdit"
                className="profile_input"
                onChange={handleProfileGenderChange}
                defaultValue={"Female"}
            >
                <option value="Female">Female</option>
                <option value="Male">Male</option>
            </select>

            <label className="profile_label" style={{marginLeft:"14.5rem", color: "white"}}>Physical Address</label>
            <input
                name="profileAddressEdit"
                type="email"
                onChange={handleProfilePhysicalAddressChange}
                className="profile_input"
                placeholder="Physical Address"
            />


            <div className="profile_buttons_div">

                <div style={{display:"flex", flexDirection:"column", marginLeft: "3rem"}}>
                    <button
                        type="button"
                        onClick={addProfile}
                        style={{borderStyle:"none", backgroundColor:"unset"}}
                    >
                        <svg width= "2.7rem" height="2.7rem" className="perk_image"  style={{backgroundColor: "whitesmoke", borderRadius: "15rem"}}>
                            <image href={save} height="100%" width= "100%" />
                        </svg>
                            <p className="contact_icon_text" style={{color: "white", marginLeft:"1.8rem"}}>Save</p>
                    </button>
                </div>

            </div>

        </div>
        </>
        }


        </div>
    </>
    )
    }
            </form>
        </div>
    )
};

export default ProfileForm;