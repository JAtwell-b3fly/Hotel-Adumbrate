import {React, useState, useEffect} from "react";
import { useHistory } from "react-router-dom";
import { addDoc, collection, getDocs, getDoc, setDoc, doc} from "firebase/firestore";
import { auth, db } from "../config/firebase"; 
import { getAuth } from "firebase/auth";

import zeroStar from "../images/0starrating.png";
import oneStar from "../images/1starrating.png";
import twoStar from "../images/2starrating.png";
import threeStar from "../images/3starrating.png";
import fourStar from "../images/4starrating.png";
import fiveStar from "../images/5starrating.png";

const WishlistC = () => {

    const [wishlists, setWishlists] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState({});

    const history = useHistory();
    const auth = getAuth();
    const user = auth.currentUser;

    const goToDisplay = ((roomId) => {
        const room = wishlists.find((room) => room.id === roomId);
        setSelectedRoom(room);
        history.push("/display", room);
    })

    const handleSelectedRoom = (roomId) => {
        const room = wishlists.find((room) => room.id === roomId);
        setSelectedRoom(room);
    }

    const handleRemoveWishlist = async(roomId) => {
        if(user) {
            try {
                const userDocRef = doc(db, "wishlists", user.email);
                const docSnap = await getDoc(userDocRef);
                const existingWishlist = docSnap.exists() ? docSnap.data().wishlist : [];

                //Filter out the room that needs to be removed
                const updatedWishlist = existingWishlist.filter((id) => id !== roomId);

                //Update the Firestore document with the updated wishlsit
                await setDoc(userDocRef, {wishlist: updatedWishlist }, {merge: true});

                //Update the local state to reflect the change
                setWishlists(updatedWishlist);

                alert("Removed From Wishlist");
            } catch (error) {
                console.error("Error removing from wishlist: ", error);
            }
        }
    }

    useEffect(() => {
        getWishlist();
        console.log("Wishlist: ", wishlists);
    }, []);

    const getWishlist = async() => {
        if (user) {
            try {
                const userDocRef = doc(db, "wishlists", user.email);
                console.log("User Document Reference:", userDocRef);

                const docSnap = await getDoc(userDocRef);

                if (docSnap.exists()) {
                    const wishlistData = docSnap.data();
                    const wishlistArray = wishlistData.wishlist ? Object.values(wishlistData.wishlist) : [];
                    setWishlists(wishlistArray);
                } else {
                    console.log("No such document exists");
                }
            } catch (error) {
                console.error("Error the wishlist information: ", error.message)
            }
        }
    }

    //Access the wishlist object directly to access the data
    const wishlist = wishlists.length > 0 ? wishlists[0].wishlist : {};

    //Convert the room objects to an array for mapping
    const roomsArray = Object.keys(wishlist).map((roomId) => {
        const room = wishlist[roomId];
        return {
            roomId, 
            ...room
        }
    })

    return(
        <div className="available_rooms_box">

            <div className = "scroll_container" style={{display:"flex", position: "relative", flexDirection: "row"}}>
                {roomsArray.map((room) => (
                    <div className="rooms_div" key={room.id}>

                    <div className="room_image_div">
                        <svg width="100%" height="100%" style={{objectFit:"fill", borderRadius:"19%"}}>
                            <image href={room.image} height="100%" width="100%" />
                        </svg>
                    </div>

                    <div className="rooms_info" >
                        <h5 style={{color: "white", marginTop: "0.5rem"}}>{room.roomNumber}</h5>

                        <svg width="100%" height="100%" className="rooms_rating" style={{backgroundColor: "rgb(213, 206, 163, 0.1)"}}>
                            {room.rating === 0 && (
                                <image href={zeroStar} height="100%" width="100%" />
                            )}
                           
                           {room.rating === 1 && (
                                <image href={oneStar} height="100%" width="100%" />
                            )}

                            {room.rating === 2 && (
                                <image href={twoStar} height="100%" width="100%" />
                            )}

                            {room.rating === 3 && (
                                <image href={threeStar} height="100%" width="100%" />
                            )}

                            {room.rating === 4 && (
                                <image href={fourStar} height="100%" width="100%" />
                            )}

                            {room.rating === 5 && (
                                <image href={fiveStar} height="100%" width="100%" />
                            )}
                        </svg>

                        <p style={{fontSize:"75%", color: "white"}}>{room.bed} Bedrooms, {room.bathroom} Bathrooms, {room.airConditioning} Air Conditioning</p>
                        <p style={{fontSize:"75%", color: "white"}}>{room.suite} Suite</p>
                        
                        <h3 style={{color: "white"}}>R {room.price}</h3>

                        <div style={{display:"flex"}}>

                            <button
                                className="view_more_button"
                                style={{ marginLeft:"0.5rem", paddingTop: "15px", marginTop: "0.1px"}}
                                name="Add To Wishlist Button"
                                onClick = {() => handleRemoveWishlist(room.id)}
                            >
                              
                              <p className="available_button_text" style={{fontSize: "85%"}}>
                                 Remove from Favourites
                                 </p> 
                            </button>

                            <button
                                name="View More Button"
                                className="view_more_button"
                                style={{marginTop: "0.1px"}}
                                onClick={() => goToDisplay(room.id)}
                            >
                        <p className="available_button_text" style={{paddingTop:"15px"}}> View More</p> 
                            </button>
                        </div>
                        
                    </div>

                </div>
                ))}
            </div>

            
        </div>
    )
};

export default WishlistC;