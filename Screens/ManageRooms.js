import {React, useState, useEffect} from "react";
import {collection, getDocs, updateDoc, doc} from "firebase/firestore";
import { db } from "../config/firebase"; 

import yes from "../images/booked.png";
import no from "../images/not_booked.png";

const AdminRooms = () => {
    const [rooms, setRooms] = useState([]);
    const [currentRooms, setCurrentRooms] = useState([]);
    const [roomStates, setRoomStates] = useState([]);

    const [showAllRoomsTable, setShowAllRoomsTable] = useState(true);

    const toggleTables = () => {
        setShowAllRoomsTable(!showAllRoomsTable);
    };


    useEffect(() => {
        getRoomsReservations();
        //console.log("Room Reservations: ", rooms)
        getRooms();
    }, []);

    
    // Use another useEffect to listen for changes in roomReservations
    useEffect(() => {
        // Update Firestore when roomReservations change
        if (rooms.length > 0) {
            updateRoomReservationsInFirestore(rooms);
        }
    }, [rooms]);

    
    //Function to update room reservations in Firestore
    const updateRoomReservationsInFirestore = async (reservations) => {
        try {
            for (const reservation of reservations) {
                const reservationRef = doc(db, "reservations", reservation.id);
                // Create an object with the updated fields
                const updatedFields = {
                    serviceCleaned: roomStates[reservation.index].cleaned,
                    serviceAirConditioning: roomStates[reservation.index].airConditioning,
                    serviceTelevision: roomStates[reservation.index].television,
                    serviceFireplace: roomStates[reservation.index].fireplace,
                    serviceBalcony: roomStates[reservation.index].balcony,
                    serviceBathroom: roomStates[reservation.index].bathrooms,
                    serviceBed: roomStates[reservation.index].bedrooms,
                    serviceWifi: roomStates[reservation.index].wifi,
                    serviceAvailability: roomStates[reservation.index].availability,
                };
    
                // Update the reservation data with the new fields
                await updateDoc(reservationRef, updatedFields);
            }
        } catch (error) {
            console.log("Error updating reservations in Firestore: ", error.message);
        }
    };

      

    const getRoomsReservations = async() => {
        try {
          const querySnapShot = await getDocs(collection(db, "reservations"));

          const data = querySnapShot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
          }))

          setRooms(data);
          // Initialize roomStates array with the initial values from data
      setRoomStates(data.map(() => ({ cleaned: false, airConditioning: false, fireplace: false, balcony: false, television: false, bedrooms: false, bathrooms: false, wifi: false, availability: false })));

        } catch (error) {
            console.log("Error fetching reservations made: ", error.message)
        }
    }

    const getRooms = async() => {
        try {
          const querySnapShot = await getDocs(collection(db, "availableRooms"));

          const data = querySnapShot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
          }))

          setCurrentRooms(data);

        } catch (error) {
            console.log("Error fetching reservations made: ", error.message)
        }
    }

    const handleTogglePress = async (roomIndex, property) => {
        try {
          const newRoomStates = [...roomStates];
          newRoomStates[roomIndex][property] = !newRoomStates[roomIndex][property];
          setRoomStates(newRoomStates);
      
          const updatedData = { [property]: newRoomStates[roomIndex][property] };
          const roomId = rooms[roomIndex].id;
      
          // First, update the local state
          setRoomStates((prevState) => {
            const updatedState = [...prevState];
            updatedState[roomIndex] = { ...updatedState[roomIndex], ...updatedData };
            return updatedState;
          });
      
          // Then, update Firestore
          const roomServiceRef = doc(db, 'roomService', roomId);
          await updateDoc(roomServiceRef, updatedData);
          
          // Data updated successfully
        } catch (error) {
          console.error('Error updating document: ', error);
        }
      };
      

    return(
        <div className= "managerooms">
            <form>
                <div style={{display:"flex", flexDirection:"row"}}>
                <div className="admin_search_div">
                    <input name="searchbar"
                            type="text"
                            className="admin_searchbar"
                            placeholder="Search here..."
                    />
                </div>

                <div style={{ display: "flex", marginLeft: "10rem", marginTop: "1.5rem", flexDirection: "row", width: "100%" }}>
                    <button style={{borderStyle:"none", backgroundColor:"unset"}} type="button" onClick={toggleTables}>  
                        <p style={{ color: "white", textAlign: "center", flex: "1", fontSize: "100%", height: "2rem", whiteSpace: "nowrap" }}>View All Rooms</p>
                    </button>

                    <button style={{borderStyle:"none", backgroundColor:"unset"}} type="button" onClick={toggleTables}>
                        <p style={{ marginLeft: "3rem", color: "white", flex: "1", fontSize: "100%", height: "2rem", whiteSpace: "nowrap" }}>Room Service Management</p>
                    </button>
            </div>
                </div>
            </form>

            {showAllRoomsTable ? (
                <div className="View_All_Rooms" style={{ maxHeight: "25rem",width: "60rem", overflowY: "auto" }}>
                <table style={{textAlign:"center", borderInlineStyle:"solid", marginLeft:"2rem", marginTop:"2rem",width: "50rem"}}>
                    <tr>
                        <th style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white", width: "6rem"}}>Suite Type</th>
                        <th style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white", width: "6rem"}}>Room Number</th>
                        <th style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white", width: "6rem"}}>Floor Level</th>
                        <th style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white"}}>Rating</th>
                        <th style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white"}}>Air Conditioning</th>
                        <th style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white"}}>Fireplace</th>
                        <th style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white"}}>Balcony</th>
                        <th style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white"}}>Television</th>
                        <th style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white"}}>Bedrooms</th>
                        <th style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white"}}>Bathrooms</th>
                        <th style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white"}}>Wifi</th>
                        <th style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white"}}>Availability</th>
                        <th style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white", width: "6rem"}}>Total Cost</th>
                    </tr>
    
                    {currentRooms.map((currentRoom, index) => (
                        <>
                    <tr key={currentRoom.id}>
                        
                            
                        <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white", width: "6rem"}}>{currentRoom.suite}</td>
                        <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white", width: "6rem"}}>{currentRoom.roomNumber}</td>
                        <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white", width: "6rem"}}>Level {currentRoom.floorLevel}</td>
                        <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white", width: "6rem"}}>{currentRoom.rating}</td>
                        <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white", width: "6rem"}}>{currentRoom.airConditioning}</td>
    
                        <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white", width: "6rem"}}>{currentRoom.fireplace ? "Yes": "No"}</td>
    
                        <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white", width: "6rem"}}>{currentRoom.balcony ? "Yes" : "No"}</td>
                        <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white", width: "6rem"}}>{currentRoom.television}</td>
    
                        <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white", width: "6rem"}}>{currentRoom.bed}</td>
    
                        <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white", width: "6rem"}}>{currentRoom.bathroom}</td>
    
                        <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white", width: "6rem"}}>{currentRoom.wifi ? "Yes" : "No"}</td>
    
                        <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white", width: "6rem"}}>{currentRoom.madeAvailable}</td>
                        <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white", width: "6rem"}}>R {currentRoom.price}</td>
                        
                        
                    </tr>
                    </>
                    ))}
                </table>
            </div>
            ) : (
                <div className="Room_Service_Management" style={{ maxHeight: "25rem",width: "60rem", overflowY: "auto" }}>
            <table style={{textAlign:"center", borderInlineStyle:"solid", marginLeft:"2rem", marginTop:"2rem",width: "50rem"}}>
                <tr>
                    <th style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white", width: "6rem"}}>Suite Type</th>
                    <th style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white", width: "6rem"}}>Room Number</th>
                    <th style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white", width: "6rem"}}>Floor Level</th>
                    <th style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white"}}>Cleaned</th>
                    <th style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white"}}>Air Conditioning</th>
                    <th style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white"}}>Fireplace</th>
                    <th style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white"}}>Balcony</th>
                    <th style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white"}}>Television</th>
                    <th style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white"}}>Bedrooms</th>
                    <th style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white"}}>Bathrooms</th>
                    <th style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white"}}>Wifi</th>
                    <th style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white"}}>Availability</th>
                    <th style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white", width: "6rem"}}>Total Cost</th>
                </tr>

                {rooms.map((room, index) => (
                    <>
                <tr key={room.id}>
                    
                        
                        <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white", width: "6rem"}}>{room.hotelSuite}</td>
                    <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white", width: "6rem"}}>{room.roomNumber}</td>
                    <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white", width: "6rem"}}>Level {room.floorLevel}</td>
                    <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)"}}>
                        <button style={{borderStyle:"none", backgroundColor:"unset"}} type= "button" onClick={() => handleTogglePress(index, "cleaned")}>
                        {roomStates[index].cleaned ? 
                        <>
                        <svg width="2.5rem" height="2.5rem">
                            <image href={yes} alt="Yes" width="2.5rem" height="2.5rem" />
                        </svg> 
                        </>
                        : 
                        <>
                        <svg width="2.5rem" height="2.5rem">
                            <image href={no} alt="No" width="2.5rem" height="2.5rem" />
                        </svg>
                        </>}   
                        </button>
                    </td>
                    <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)"}}><button key={room.id} style={{borderStyle:"none", backgroundColor:"unset"}} type= "button" onClick={() => handleTogglePress(index, "airConditioning")}>
                        {roomStates[index].airConditioning  ? 
                        <>
                        <svg width="2.5rem" height="2.5rem">
                            <image href={yes} alt="Yes" width="2.5rem" height="2.5rem" />
                        </svg> 
                        </>
                        : 
                        <>
                        <svg width="2.5rem" height="2.5rem">
                            <image href={no} alt="No" width="2.5rem" height="2.5rem" />
                        </svg>
                        </>}   
                        </button>
                        </td>

                    <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)"}}><button key={room.id} style={{borderStyle:"none", backgroundColor:"unset"}} type= "button" onClick={() => handleTogglePress(index, "fireplace")}>
                        {roomStates[index].fireplace ? 
                        <>
                        <svg width="2.5rem" height="2.5rem">
                            <image href={yes} alt="Yes" width="2.5rem" height="2.5rem" />
                        </svg> 
                        </>
                        : 
                        <>
                        <svg width="2.5rem" height="2.5rem">
                            <image href={no} alt="No" width="2.5rem" height="2.5rem" />
                        </svg>
                        </>}   
                        </button>
                        </td>

                    <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)"}}><button key={room.id} style={{borderStyle:"none", backgroundColor:"unset"}} type= "button" onClick={() => handleTogglePress(index, "balcony")}>
                        {roomStates[index].balcony ? 
                        <>
                        <svg width="2.5rem" height="2.5rem">
                            <image href={yes} alt="Yes" width="2.5rem" height="2.5rem" />
                        </svg> 
                        </>
                        : 
                        <>
                        <svg width="2.5rem" height="2.5rem">
                            <image href={no} alt="No" width="2.5rem" height="2.5rem" />
                        </svg>
                        </>}   
                        </button></td>
                    <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)"}}><button key={room.id} style={{borderStyle:"none", backgroundColor:"unset"}} type= "button" onClick={() => handleTogglePress(index, "television")}>
                        {roomStates[index].television ? 
                        <>
                        <svg width="2.5rem" height="2.5rem">
                            <image href={yes} alt="Yes" width="2.5rem" height="2.5rem" />
                        </svg> 
                        </>
                        : 
                        <>
                        <svg width="2.5rem" height="2.5rem">
                            <image href={no} alt="No" width="2.5rem" height="2.5rem" />
                        </svg>
                        </>}   
                        </button>
                        </td>

                    <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)"}}><button key={room.id} style={{borderStyle:"none", backgroundColor:"unset"}} type= "button" onClick={() => handleTogglePress(index, "bedrooms")}>
                        {roomStates[index].bedrooms ? 
                        <>
                        <svg width="2.5rem" height="2.5rem">
                            <image href={yes} alt="Yes" width="2.5rem" height="2.5rem" />
                        </svg> 
                        </>
                        : 
                        <>
                        <svg width="2.5rem" height="2.5rem">
                            <image href={no} alt="No" width="2.5rem" height="2.5rem" />
                        </svg>
                        </>}   
                        </button>
                        </td>

                    <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)"}}><button key={room.id} style={{borderStyle:"none", backgroundColor:"unset"}} type= "button" onClick={() => handleTogglePress(index, "bathrooms")}>
                        {roomStates[index].bathrooms ? 
                        <>
                        <svg width="2.5rem" height="2.5rem">
                            <image href={yes} alt="Yes" width="2.5rem" height="2.5rem" />
                        </svg> 
                        </>
                        : 
                        <>
                        <svg width="2.5rem" height="2.5rem">
                            <image href={no} alt="No" width="2.5rem" height="2.5rem" />
                        </svg>
                        </>}   
                        </button>
                        </td>

                    <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)"}}><button key={room.id} style={{borderStyle:"none", backgroundColor:"unset"}} type= "button" onClick={() => handleTogglePress(index, "wifi")}>
                        {roomStates[index].wifi ? 
                        <>
                        <svg width="2.5rem" height="2.5rem">
                            <image href={yes} alt="Yes" width="2.5rem" height="2.5rem" />
                        </svg> 
                        </>
                        : 
                        <>
                        <svg width="2.5rem" height="2.5rem">
                            <image href={no} alt="No" width="2.5rem" height="2.5rem" />
                        </svg>
                        </>}   
                        </button>
                        </td>

                    <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)"}}><button key={room.id} style={{borderStyle:"none", backgroundColor:"unset"}} type= "button" onClick={() => handleTogglePress(index, "availability")}>
                        {roomStates[index].availability ? 
                        <>
                        <svg width="2.5rem" height="2.5rem">
                            <image href={yes} alt="Yes" width="2.5rem" height="2.5rem" />
                        </svg> 
                        </>
                        : 
                        <>
                        <svg width="2.5rem" height="2.5rem">
                            <image href={no} alt="No" width="2.5rem" height="2.5rem" />
                        </svg>
                        </>}   
                        </button></td>
                    <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white", width: "6rem"}}>R {room.price}</td>
                    
                    
                </tr>
                </>
                ))}
            </table>
        </div>
            )}  
        </div>
    )
};

export default AdminRooms;