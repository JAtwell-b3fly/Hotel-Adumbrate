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

import Loader from "./Loader";


const AvailableRoomsComp = ({searchTerm}) => {

    const [avRooms, setAvRooms] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const filteredRooms = avRooms.filter(room => 
        room.suite.toLowerCase().includes(searchTerm.toLowerCase()) ||
        room.roomNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        getAvailableRooms();
        console.log("Rooms Data: ", avRooms);
    }, []);

    const getAvailableRooms = async() => {
        setIsLoading(true)
        try {
            const querySnapShot = await getDocs(collection(db, "availableRooms"));
            const data = querySnapShot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }))
                setAvRooms(data);
        setIsLoading(false)
        } catch (error) {
            console.log("Error fetching Available Rooms Data: ", error.message);
        }
    }

    const history = useHistory();
    const auth = getAuth();
    const user = auth.currentUser;

    const handleSelectedRoom = (roomId) => {
        const room = avRooms.find((room) => room.id === roomId);
        setSelectedRoom(room);
    }

    const goToDisplay = ((roomId) => {
        const room = avRooms.find((room) => room.id === roomId);
        setSelectedRoom(room);
        history.push("/display", room);
    })

    return(
        <div className="available_rooms_box">

            {isLoading ?
            (
                <Loader />
            )
            :
            (
                <>
                <div className = "scroll_container" style={{display:"flex", position: "relative", flexDirection: "row"}}>
                {filteredRooms.map((filteredRoom) => (
                    <div className="rooms_div" key={filteredRoom.id}>

                    <div className="room_image_div">
                        <svg width="100%" height="100%" style={{objectFit:"fill", borderRadius:"19%"}}>
                            <image href={filteredRoom.image} height="100%" width="100%" />
                        </svg>
                    </div>

                    <div className="rooms_info" >
                        <h5 style={{color: "white", marginTop: "0.5rem"}}>{filteredRoom.roomNumber}</h5>

                        <svg width="100%" height="100%" className="rooms_rating" style={{backgroundColor: "rgb(213, 206, 163, 0.1)"}}>
                            {filteredRoom.rating === 0 && (
                                <image href={zeroStar} height="100%" width="100%" />
                            )}
                           
                           {filteredRoom.rating === 1 && (
                                <image href={oneStar} height="100%" width="100%" />
                            )}

                            {filteredRoom.rating === 2 && (
                                <image href={twoStar} height="100%" width="100%" />
                            )}

                            {filteredRoom.rating === 3 && (
                                <image href={threeStar} height="100%" width="100%" />
                            )}

                            {filteredRoom.rating === 4 && (
                                <image href={fourStar} height="100%" width="100%" />
                            )}

                            {filteredRoom.rating === 5 && (
                                <image href={fiveStar} height="100%" width="100%" />
                            )}
                        </svg>

                        <p style={{fontSize:"75%", color: "white"}}>{filteredRoom.bed} Bedrooms, {filteredRoom.bathroom} Bathrooms, {filteredRoom.airConditioning} Air Conditioning</p>
                        <p style={{fontSize:"75%", color: "white"}}>{filteredRoom.suite} Suite</p>
                        
                        <h3 style={{color: "white"}}>R {filteredRoom.price}</h3>

                        <div style={{display:"flex"}}>

                            <button
                                name="View More Button"
                                className="view_more_button"
                                style={{marginTop: "0.1px", marginLeft: "5.5rem"}}
                                onClick={() => goToDisplay(filteredRoom.id)}
                            >
                        <p className="available_button_text" style={{paddingTop:"15px"}}> View More</p> 
                            </button>
                        </div>
                        
                    </div>

                </div>
                ))}

                {filteredRooms.length = 0 && avRooms && avRooms.map((room) => (
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
                                name="View More Button"
                                className="view_more_button"
                                style={{marginTop: "0.1px", marginLeft: "5.5rem"}}
                                onClick={() => goToDisplay(room.id)}
                            >
                        <p className="available_button_text" style={{paddingTop:"15px"}}> View More</p> 
                            </button>
                        </div>
                        
                    </div>

                </div>
                ))}
            </div>
                </>
            )
            }
            </div>
            
    )
};

export default AvailableRoomsComp;