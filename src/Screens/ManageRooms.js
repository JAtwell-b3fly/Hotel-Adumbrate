import React,{ useState, useEffect} from "react";
import {collection, getDocs, doc, setDoc, updateDoc} from "firebase/firestore";
import { db } from "../config/firebase"; 

import yes from "../images/booked.png";
import no from "../images/not_booked.png";

import Loader from "../Components/Loader";

const AdminRooms = () => {
    const [rooms, setRooms] = useState([]);
    const [currentRooms, setCurrentRooms] = useState([]);
    const [editAllRoomsRow, setEditAllRoomsRow] = useState("DisplayRow")
    const [editAllRoomsToggle, setEditAllRoomsToggle] = useState(Array(currentRooms.length).fill(false));

    const [showAllRoomsTable, setShowAllRoomsTable] = useState(true);
    const [selectedButton, setSelectedButton] = useState("ViewAllRooms")
    const [isLoading, setIsLoading] = useState(false);

    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    }

    const filteredRooms = selectedButton === "ViewAllRooms"
    ? currentRooms.filter(room => room.roomNumber.includes(searchTerm))
    : rooms.filter(room => room.reservationInformation.roomNumber.includes(searchTerm));

    const handleEditClick = (index) => {
        //Toggle the edit state for the row with the given index
        const updatedEditStates = [...editAllRoomsToggle];
        updatedEditStates[index] = !updatedEditStates[index];
        setEditAllRoomsToggle(updatedEditStates);
         // Change the row type when the "Update" or "Save" button is clicked
    setEditAllRoomsRow(updatedEditStates[index] ? "EditRow" : "DisplayRow");
    }

    const toggleTables = () => {
        if (showAllRoomsTable === true) {
            setSelectedButton("RoomServiceManagement")
            setShowAllRoomsTable(false)
            getRoomsReservations();
        } else{
            setSelectedButton("ViewAllRooms")
            setShowAllRoomsTable(true)
            getRooms();
        }
        setShowAllRoomsTable(!showAllRoomsTable);
    };


    useEffect(() => {
        getRoomsReservations();
    }, []); 

    useEffect(() => {
        getRooms();
    }, [])

    const getRoomsReservations = async() => {
        setIsLoading(true);
        try {
          const querySnapShot = await getDocs(collection(db, "reservations"));
          console.log("Running code");

          const data = querySnapShot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
          }))

          setRooms(data);

          console.log("reservations: ", rooms);
          //Initialise buttonRoomServiceToggles on fetched data
          const initialToggles = {};
          data.forEach(room => {
            initialToggles[room.id] = {
                cleanedCompleted: room.cleanedCompleted || false,
                cleanedAirConditioning: room.cleanedAirConditioning || false,
                cleanedFireplace: room.cleanedFireplace || false,
                cleanedBalcony: room.cleanedBalcony || false,
                cleanedTelevision: room.cleanedTelevision || false,
                cleanedBedroom: room.cleanedBedroom || false,
                cleanedBathroom: room.cleanedBathroom || false,
                wifiSetUp: room.wifiSetUp || false,
                availability: room.availability || false,
            }
          })
          setButtonRoomServiceToggles(initialToggles);
          console.log("reservations: ", rooms);
          setIsLoading(false);
        } catch (error) {
            console.log("Error fetching reservations made: ", error.message)
        }
    }

    const getRooms = async() => {
        setIsLoading(true);
        try {
          const querySnapShot = await getDocs(collection(db, "availableRooms"));

          const data = querySnapShot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
          }))

          setCurrentRooms(data);
          console.log("current rooms: ", currentRooms)
          setIsLoading(false);
        } catch (error) {
            console.log("Error fetching reservations made: ", error.message)
        }
    }

    const updateRoomService = async (roomId) => {
        setIsLoading(true);
        try {
            const room = rooms.find((room) => room.id === roomId);

            if (room) {
                const roomServiceDocRef = doc(db, "reservations", roomId);

                const updatedData = {
                    cleanedCompleted: buttonRoomServiceToggles[roomId]?.cleanedCompleted || false,
                    cleanedAirConditioning: buttonRoomServiceToggles[roomId]?.cleanedAirConditioning || false,
                    cleanedFireplace: buttonRoomServiceToggles[roomId]?.cleanedFireplace || false,
                    cleanedBalcony: buttonRoomServiceToggles[roomId]?.cleanedBalcony || false,
                    cleanedTelevision: buttonRoomServiceToggles[roomId]?.cleanedTelevision || false,
                    cleanedBathroom: buttonRoomServiceToggles[roomId]?.cleanedBathroom || false,
                    cleanedBedroom: buttonRoomServiceToggles[roomId]?.cleanedBedroom || false,
                    wifiSetUp: buttonRoomServiceToggles[roomId]?.wifiSetUp || false,
                    availability: buttonRoomServiceToggles[roomId]?.availability || false,
                }
                 
                await updateDoc(roomServiceDocRef, updatedData);
                alert(`Room service for ${room.reservationInformation.name} (${roomId}) updated successfully`);
            }
           
        } catch (error) {
            console.error("Error updating room service for existing reservation: ", error.message)
        }
        setIsLoading(false);
    }

    const updateRooms = async (currentRoomId) => {
        setIsLoading(true)
        try {
            const currentRoom = currentRooms.find((currentRoom) => currentRoom.id === currentRoomId);

            if (currentRoom){
                const currentRoomDocRef = doc(db, "availableRooms", currentRoomId);
                const updatedData = {
                    airConditioning: editRoom.editAirConditioning !== null ? editRoom.editAirConditioning : currentRoom.airConditioning,
                    balcony: editRoom.editBalcony !== null ? editRoom.editBalcony : currentRoom.balcony,
                    bathroom: editRoom.editBathroom !== null ? editRoom.editBathroom : currentRoom.bathroom,
                    bed: editRoom.editBed !== null ? editRoom.editBed : currentRoom.bed,
                    fireplace: editRoom.editFireplace !== null ? editRoom.editFireplace : currentRoom.fireplace,
                    floorLevel: editRoom.editFloorLevel !== null ? editRoom.editFloorLevel : currentRoom.floorLevel,
                    hasAirConditioning: editRoom.editHasAirConditioning !== null ? editRoom : currentRoom.hasAirConditioning,
                    hasTelevision: editRoom.editTelevision !== null ? editRoom.editTelevision : currentRoom.television,
                    image: editRoom.editImage !== "" ? editRoom.editImage : currentRoom.image,
                    longDescription: editRoom.editLongDescription !== "" ? editRoom.editLongDescription : currentRoom.longDescription,
                    madeAvailable: editRoom.editMadeAvailable !== "" ? editRoom.editMadeAvailable : currentRoom.madeAvailable,
                    name: editRoom.editName !== "" ? editRoom.editName : currentRoom.name,
                    price: editRoom.editPrice !== null ? editRoom.editPrice : currentRoom.price,
                    rating: editRoom.editRating !== null ? editRoom.editRating : currentRoom.rating,
                    roomNumber: editRoom.editRoomNumber !== "" ? editRoom.editRoomNumber : currentRoom.roomNumber,
                    shortDescription: editRoom.editShortDescription !== "" ? editRoom.editShortDescription : currentRoom.shortDescription,
                    suite: editRoom.editSuite !== "" ? editRoom.editSuite : currentRoom.suite,
                    television: editRoom.editTelevision !== null ? editRoom.editTelevision : currentRoom.television,
                    wifi: editRoom.editWifi !== null ? editRoom.editWifi : currentRoom.wifi
                }
                await updateDoc(currentRoomDocRef, updatedData)
                alert(`Available Rooms for ${currentRoom.roomNumber} (${currentRoomId}) updated successfully`)

                // Switch back to display state after updating
                setEditRoom("DisplayRow");

                // Reset the edit state for the specific room to an initial state
                setEditRoom({
                    editAirConditioning: null,
                    editBalcony: null,
                    editBathroom: null,
                    editBed: null,
                    editFireplace: null,
                    editFloorLevel: null,
                    editHasAirConditioning: null,
                    editHasTelevision: null,
                    editImage: "",
                    editLongDescription: "",
                    editMadeAvailable: "",
                    editName: "",
                    editPrice: null,
                    editRating: null,
                    editRoomNumber: "",
                    editShortDescription: "",
                    editSuite: "",
                    editTelevision: null,
                    editWifi: null,
                });

                // Optionally, you can update the local state or UI to reflect the changes
                // For example, you can reset the editAllRoomsToggle state for the specific room
                const updatedEditStates = [...editAllRoomsToggle];
                const roomIndexToUpdate = currentRooms.findIndex((room) => room.id === currentRoomId);
                updatedEditStates[roomIndexToUpdate] = false;
                setEditAllRoomsToggle(updatedEditStates);

                //Get the updated values from firebase once more
                getRooms();
                
            }

        } catch (error) {
            console.error("Error updating current rooms: ", error.message);
        }

        setIsLoading(false);
    }

    const [editRoom, setEditRoom] = useState({
        editAirConditioning: null,
        editBalcony: null,
        editBathroom: null,
        editBed: null,
        editFireplace: null,
        editFloorLevel: null,
        editHasAirConditioning: null,
        editHasTelevision: null,
        editImage: "",
        editLongDescription: "",
        editMadeAvailable: "",
        editName: "",
        editPrice: null,
        editRating: null,
        editRoomNumber: "",
        editShortDescription: "",
        editSuite: "",
        editTelevision: null,
        editWifi: null,
    });

    const cancelRoomUpdate = (index) => {
        setEditRoom("DisplayRow");

        const updatedEditStates = [...editAllRoomsToggle];
        updatedEditStates[index] = false;
        setEditAllRoomsToggle(updatedEditStates);
    }

    const [buttonRoomServiceToggles, setButtonRoomServiceToggles] = useState({});

    const toggleCleanedCompleted = (roomId) => {
        console.log("CleanedRoomId: ", roomId);
        setButtonRoomServiceToggles((prevToggles) => {
        const updatedToggles = {
            ...prevToggles,
            [roomId] : {...prevToggles[roomId],
                cleanedCompleted: !prevToggles[roomId]?.cleanedCompleted || false}
        }
        return updatedToggles;
        });
    }

    const toggleAirConditioning = (roomId) => {
        console.log("Air ConditioningId: ", roomId);
        setButtonRoomServiceToggles((prevToggles) => {
            const updatedToggles = {
            ...prevToggles,
            [roomId] : {...prevToggles[roomId],cleanedAirConditioning: !prevToggles[roomId]?.cleanedAirConditioning || false}    
            }
            return updatedToggles;
        });
    };
   
    const toggleFireplace = (roomId) => {
        setButtonRoomServiceToggles((prevToggles) => {
            const updatedToggles = {
                ...prevToggles,
                [roomId] : {...prevToggles[roomId],cleanedFireplace: !prevToggles[roomId]?.cleanedFireplace || false}
            }
           return updatedToggles;
        });
    };

    const toggleBalcony = (roomId) => {
        setButtonRoomServiceToggles((prevToggles) => {
            const updatedToggles = {
                ...prevToggles,
                [roomId]: {...prevToggles[roomId],cleanedBalcony: !prevToggles[roomId]?.cleanedBalcony || false}
            }
            return updatedToggles;
        });
    };

    const toggleTelevision = (roomId) => {
        setButtonRoomServiceToggles((prevToggles) => {
            const updatedToggles = {
                ...prevToggles,
                [roomId] : {...prevToggles[roomId],cleanedTelevision: !prevToggles[roomId]?.cleanedTelevision || false}
            }
            return updatedToggles;
        });
    };

    const toggleBedroom = (roomId) => {
        setButtonRoomServiceToggles((prevToggles) => {
            const updatedToggles = {
                ...prevToggles,
                [roomId] : {...prevToggles[roomId],cleanedBedroom: !prevToggles[roomId]?.cleanedBedroom || false}
            }
            return updatedToggles;
        });
    };

    const toggleBathroom = (roomId) => {
        setButtonRoomServiceToggles((prevToggles) => {
            const updatedToggles = {
                ...prevToggles,
                [roomId] : {...prevToggles[roomId],cleanedBathroom: !prevToggles[roomId]?.cleanedBathroom || false}
            }
            return updatedToggles;
        });
    };

    const toggleWifiSetUp = (roomId) => {
        setButtonRoomServiceToggles((prevToggles) => {
            const updatedToggles = {
                ...prevToggles,
                [roomId] : {...prevToggles[roomId],wifiSetUp: !prevToggles[roomId]?.wifiSetUp || false}
            }
            return updatedToggles;
        });
    };

    const toggleAvailability = (roomId) => {
        setButtonRoomServiceToggles((prevToggles) => {
            const updatedToggles = {
                ...prevToggles,
                [roomId] : {...prevToggles[roomId],availability: !prevToggles[roomId]?.availability || false}
            }
            return updatedToggles;
        });
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
                            value={searchTerm}
                            onChange={handleSearchChange}
                    />
                </div>

                <div style={{ display: "flex", marginLeft: "10rem", marginTop: "1.5rem", flexDirection: "row", width: "100%" }}>
                    <button className={selectedButton === "ViewAllRooms" ? "manageRoomsButtonSelected": "manageRoomsButtonsUnselected"} type="button" onClick={toggleTables}>  
                        <p style={{ color: "black", textAlign: "center", flex: "1", fontSize: "80%", height: "1rem", whiteSpace: "nowrap", marginTop: "0.5rem", fontWeight: "bold",fontFamily: 'Cinzel' }}>View All Rooms</p>
                    </button>

                    <button className={selectedButton === "RoomServiceManagement" ? "manageRoomsButtonSelected":"manageRoomsButtonsUnselected"} type="button" onClick={toggleTables}>
                        <p style={{ marginLeft: "0.5rem", color: "black", textAlign: "center", flex: "1", fontSize: "80%", height: "1rem", whiteSpace: "nowrap", marginTop: "0.5rem", fontWeight: "bold",fontFamily: 'Cinzel' }}>Room Service Management</p>
                    </button>
            </div>
                </div>
            </form>

            {showAllRoomsTable ? (
                <div className="View_All_Rooms" style={{ maxHeight: "25rem",width: "66rem", overflowY: "auto", overflowX: "auto" }}>
                    {isLoading ?
                    (
                        <Loader />
                    )
                    :
                    (
                        <> 
                        <table style={{textAlign:"center", borderInlineStyle:"solid", marginLeft:"2rem", marginTop:"2rem",width: "50rem"}}>
                            <thead>
                    <tr>
                        <th style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "black",fontFamily: 'Cinzel', width: "6rem", backgroundColor: "rgba(255,255,255,0.7)", fontSize: "80%"}}>Suite Type</th>
                        <th style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "black",fontFamily: 'Cinzel', width: "6rem", backgroundColor: "rgba(255,255,255,0.7)", fontSize: "80%"}}>Room Number</th>
                        <th style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "black",fontFamily: 'Cinzel', width: "6rem", backgroundColor: "rgba(255,255,255,0.7)", fontSize: "80%"}}>Floor Level</th>
                        <th style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "black",fontFamily: 'Cinzel', backgroundColor: "rgba(255,255,255,0.7)", fontSize: "80%"}}>Rating</th>
                        <th style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "black",fontFamily: 'Cinzel', backgroundColor: "rgba(255,255,255,0.7)", fontSize: "80%"}}>Air Conditioning</th>
                        <th style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "black",fontFamily: 'Cinzel', backgroundColor: "rgba(255,255,255,0.7)", fontSize: "80%"}}>Fireplace</th>
                        <th style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "black",fontFamily: 'Cinzel', backgroundColor: "rgba(255,255,255,0.7)", fontSize: "80%"}}>Balcony</th>
                        <th style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "black",fontFamily: 'Cinzel', backgroundColor: "rgba(255,255,255,0.7)", fontSize: "80%"}}>Television</th>
                        <th style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "black",fontFamily: 'Cinzel', backgroundColor: "rgba(255,255,255,0.7)", fontSize: "80%"}}>Bedrooms</th>
                        <th style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "black",fontFamily: 'Cinzel', backgroundColor: "rgba(255,255,255,0.7)", fontSize: "80%"}}>Bathrooms</th>
                        <th style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "black",fontFamily: 'Cinzel', backgroundColor: "rgba(255,255,255,0.7)", fontSize: "80%"}}>Wifi</th>
                        <th style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "black",fontFamily: 'Cinzel', backgroundColor: "rgba(255,255,255,0.7)", fontSize: "80%"}}>Availability</th>
                        <th style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "black", width: "6rem",fontFamily: 'Cinzel', backgroundColor: "rgba(255,255,255,0.7)", fontSize: "80%"}}>Total Cost</th>
                        <th style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "black", width: "6rem",fontFamily: 'Cinzel', backgroundColor: "rgba(255,255,255,0.7)", fontSize: "80%"}}></th>
                        <th style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "black", width: "6rem",fontFamily: 'Cinzel', backgroundColor: "rgba(255,255,255,0.7)", fontSize: "80%"}}></th>
                    </tr>
                    </thead>

                    <tbody>
    
                    {filteredRooms.length === 0 
                    ? currentRooms.map((currentRoom, index) => (
                        <React.Fragment key={currentRoom.id} >
                    
                        {
                            editAllRoomsToggle[index] ? 
                            (
                                    <tr>
                        
                        <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white", width: "6rem",fontFamily: 'Cinzel'}}><input style={{textAlign: "center", fontSize: "80%", fontWeight: "bold", width: "4rem"}} defaultValue ={currentRoom.suite} placeholder={currentRoom.suite} value={editRoom.editSuite || currentRoom.suite} onChange={(e) => setEditRoom({...editRoom, editSuite: e.target.value})} /></td>
                        <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white", width: "6rem",fontFamily: 'Cinzel'}}><input style={{textAlign: "center", fontSize: "80%", fontWeight: "bold", width: "4.5rem"}} defaultValue={currentRoom.roomNumber} placeholder={currentRoom.roomNumber} value={editRoom.editRoomNumber || currentRoom.roomNumber} onChange={(e) => setEditRoom({...editRoom, editRoomNumber: e.target.value })} /></td>
                        <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white", width: "6rem",fontFamily: 'Cinzel'}}><input style={{textAlign: "center", fontSize: "80%", fontWeight: "bold", width: "3.5rem"}} defaultValue={currentRoom.floorLevel} placeholder={"Level " + currentRoom.floorLevel} value={editRoom.editFloorLevel || currentRoom.floorLevel} onChange={(e) => setEditRoom({...editRoom, editFloorLevel: e.target.value})} /></td>
                        <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white", width: "6rem",fontFamily: 'Cinzel'}}><input style={{textAlign: "center", fontSize: "80%", fontWeight: "bold", width: "3.5rem"}} defaultValue={currentRoom.rating} placeholder={currentRoom.rating} value={editRoom.editRating || currentRoom.rating} onChange={(e) => setEditRoom({...editRoom, editRating: e.target.value})} /></td>
                        <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white", width: "6rem",fontFamily: 'Cinzel'}}><input style={{textAlign: "center", fontSize: "80%", fontWeight: "bold", width: "6rem"}} defaultValue={currentRoom.airConditioning} placeholder={currentRoom.airConditioning} value={editRoom.editAirConditioning || currentRoom.airConditioning} onChange={(e) => setEditRoom({...editRoom, editAirConditioning: e.target.value})} /></td>
    
                        <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white", width: "6rem",fontFamily: 'Cinzel'}}><input style={{textAlign: "center", fontSize: "80%", fontWeight: "bold", width: "4.5rem"}} defaultValue={currentRoom.fireplace} placeholder={currentRoom.fireplace ? "Yes": "No"} value={editRoom.editFireplace || currentRoom.fireplace} onChange={(e) => setEditRoom({...editRoom, editFireplace: e.target.value})} /></td>
    
                        <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white", width: "6rem",fontFamily: 'Cinzel'}}><input style={{textAlign: "center", fontSize: "80%", fontWeight: "bold", width: "4.5rem"}} defaultValue={currentRoom.balcony} placeholder={currentRoom.balcony ? "Yes" : "No"} value={editRoom.editBalcony || currentRoom.balcony} onChange={(e) => setEditRoom({...editRoom, editBalcony: e.target.value})} /></td>
                        <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white", width: "6rem",fontFamily: 'Cinzel'}}><input style={{textAlign: "center", fontSize: "80%", fontWeight: "bold", width: "5rem"}} defaultValue={currentRoom.television} placeholder={currentRoom.television} value={editRoom.editTelevision || currentRoom.television} onChange={(e) => setEditRoom({...editRoom, editTelevision: e.target.value})} /></td>
    
                        <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white", width: "6rem",fontFamily: 'Cinzel'}}><input style={{textAlign: "center", fontSize: "80%", fontWeight: "bold", width: "5rem"}} defaultValue={currentRoom.bed} placeholder={currentRoom.bed} value={editRoom.editBed || currentRoom.bed} onChange={(e) => setEditRoom({...editRoom, editBed: e.target.value})} /></td>
    
                        <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white", width: "6rem",fontFamily: 'Cinzel'}}><input style={{textAlign: "center", fontSize: "80%", fontWeight: "bold", width: "5rem"}} defaultValue={currentRoom.bathroom} placeholder={currentRoom.bathroom} value={editRoom.editBathroom || currentRoom.bathroom} onChange={(e) => setEditRoom({...editRoom, editBathroom: e.target.value})} /></td>
    
                        <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white", width: "6rem",fontFamily: 'Cinzel'}}><input style={{textAlign: "center", fontSize: "80%", fontWeight: "bold", width: "3rem"}} defaultValue={currentRoom.wifi} placeholder={currentRoom.wifi ? "Yes" : "No"} value={editRoom.editWifi || currentRoom.wifi} onChange={(e) => setEditRoom({...editRoom, editWifi: e.target.value})} /></td>
    
                        <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white", width: "6rem",fontFamily: 'Cinzel'}}><input style={{textAlign: "center", fontSize: "80%", fontWeight: "bold", width: "5rem"}} defaultValue={currentRoom.madeAvailable} placeholder={currentRoom.madeAvailable} value={editRoom.editMadeAvailable || currentRoom.madeAvailable} onChange={(e) => setEditRoom({...editRoom, editMadeAvailable: e.target.value})} /></td>
                        <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white", width: "6rem",fontFamily: 'Cinzel'}}><input style={{textAlign: "center", fontSize: "80%", fontWeight: "bold", width: "4rem"}} defaultValue={currentRoom.price} placeholder={ "R" + currentRoom.price} value={editRoom.editPrice || currentRoom.price} onChange={(e) => setEditRoom({...editRoom, editPrice: e.target.value})} /></td>
                        <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white", width: "6rem",fontFamily: 'Cinzel'}}><button type="button" className="updateButton" style={{ fontSize: "80%", width: "3.5rem"}} onClick={() => updateRooms(currentRoom.id)}>Save</button></td>
                        <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white", width: "6rem",fontFamily: 'Cinzel'}}><button type="button" className="updateButton" style={{ fontSize: "80%", width: "4rem"}} onClick={() => cancelRoomUpdate(index)}>Cancel</button></td>
                    </tr>
                                
                            )
                        :
                            (
                                    <tr>
                        
                            
                        <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white", width: "6rem",fontFamily: 'Cinzel', fontSize: "80%"}}>{currentRoom.suite}</td>
                        <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white", width: "6rem",fontFamily: 'Cinzel', fontSize: "80%"}}>{currentRoom.roomNumber}</td>
                        <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white", width: "6rem",fontFamily: 'Cinzel', fontSize: "80%"}}>{"Level " + currentRoom.floorLevel}</td>
                        <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white", width: "6rem",fontFamily: 'Cinzel', fontSize: "80%"}}>{currentRoom.rating}</td>
                        <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white", width: "6rem",fontFamily: 'Cinzel', fontSize: "80%"}}>{currentRoom.airConditioning}</td>
    
                        <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white", width: "6rem",fontFamily: 'Cinzel', fontSize: "80%"}}>{currentRoom.fireplace ? "Yes": "No"}</td>
    
                        <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white", width: "6rem",fontFamily: 'Cinzel', fontSize: "80%"}}>{currentRoom.balcony ? "Yes" : "No"}</td>
                        <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white", width: "6rem",fontFamily: 'Cinzel', fontSize: "80%"}}>{currentRoom.television}</td>
    
                        <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white", width: "6rem",fontFamily: 'Cinzel', fontSize: "80%"}}>{currentRoom.bed}</td>
    
                        <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white", width: "6rem",fontFamily: 'Cinzel', fontSize: "80%"}}>{currentRoom.bathroom}</td>
    
                        <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white", width: "6rem",fontFamily: 'Cinzel', fontSize: "80%"}}>{currentRoom.wifi ? "Yes" : "No"}</td>
    
                        <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white", width: "6rem",fontFamily: 'Cinzel', fontSize: "80%"}}>{currentRoom.madeAvailable}</td>
                        <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white", width: "6rem",fontFamily: 'Cinzel', fontSize: "80%"}}>{ "R" + currentRoom.price}</td>
                        <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white", width: "6rem",fontFamily: 'Cinzel', fontSize: "80%"}}><button type="button" className="updateButton"onClick={() => handleEditClick(index)}>Update</button></td>
                        
                    </tr>
                                
                            )
                        }
                    
                    </React.Fragment>
                    )) : filteredRooms.map((currentRoom, index) => (
                        <React.Fragment key={currentRoom.id}>
                            {editAllRoomsToggle[index] ? (
                            <tr>
                        
                            <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white", width: "6rem",fontFamily: 'Cinzel'}}><input style={{textAlign: "center", fontSize: "80%", fontWeight: "bold", width: "4rem"}} defaultValue ={currentRoom.suite} placeholder={currentRoom.suite} value={editRoom.editSuite || currentRoom.suite} onChange={(e) => setEditRoom({...editRoom, editSuite: e.target.value})} /></td>
                            <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white", width: "6rem",fontFamily: 'Cinzel'}}><input style={{textAlign: "center", fontSize: "80%", fontWeight: "bold", width: "4.5rem"}} defaultValue={currentRoom.roomNumber} placeholder={currentRoom.roomNumber} value={editRoom.editRoomNumber || currentRoom.roomNumber} onChange={(e) => setEditRoom({...editRoom, editRoomNumber: e.target.value })} /></td>
                            <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white", width: "6rem",fontFamily: 'Cinzel'}}><input style={{textAlign: "center", fontSize: "80%", fontWeight: "bold", width: "3.5rem"}} defaultValue={currentRoom.floorLevel} placeholder={"Level " + currentRoom.floorLevel} value={editRoom.editFloorLevel || currentRoom.floorLevel} onChange={(e) => setEditRoom({...editRoom, editFloorLevel: e.target.value})} /></td>
                            <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white", width: "6rem",fontFamily: 'Cinzel'}}><input style={{textAlign: "center", fontSize: "80%", fontWeight: "bold", width: "3.5rem"}} defaultValue={currentRoom.rating} placeholder={currentRoom.rating} value={editRoom.editRating || currentRoom.rating} onChange={(e) => setEditRoom({...editRoom, editRating: e.target.value})} /></td>
                            <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white", width: "6rem",fontFamily: 'Cinzel'}}><input style={{textAlign: "center", fontSize: "80%", fontWeight: "bold", width: "6rem"}} defaultValue={currentRoom.airConditioning} placeholder={currentRoom.airConditioning} value={editRoom.editAirConditioning || currentRoom.airConditioning} onChange={(e) => setEditRoom({...editRoom, editAirConditioning: e.target.value})} /></td>
        
                            <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white", width: "6rem",fontFamily: 'Cinzel'}}><input style={{textAlign: "center", fontSize: "80%", fontWeight: "bold", width: "4.5rem"}} defaultValue={currentRoom.fireplace} placeholder={currentRoom.fireplace ? "Yes": "No"} value={editRoom.editFireplace || currentRoom.fireplace} onChange={(e) => setEditRoom({...editRoom, editFireplace: e.target.value})} /></td>
        
                            <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white", width: "6rem",fontFamily: 'Cinzel'}}><input style={{textAlign: "center", fontSize: "80%", fontWeight: "bold", width: "4.5rem"}} defaultValue={currentRoom.balcony} placeholder={currentRoom.balcony ? "Yes" : "No"} value={editRoom.editBalcony || currentRoom.balcony} onChange={(e) => setEditRoom({...editRoom, editBalcony: e.target.value})} /></td>
                            <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white", width: "6rem",fontFamily: 'Cinzel'}}><input style={{textAlign: "center", fontSize: "80%", fontWeight: "bold", width: "5rem"}} defaultValue={currentRoom.television} placeholder={currentRoom.television} value={editRoom.editTelevision || currentRoom.television} onChange={(e) => setEditRoom({...editRoom, editTelevision: e.target.value})} /></td>
        
                            <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white", width: "6rem",fontFamily: 'Cinzel'}}><input style={{textAlign: "center", fontSize: "80%", fontWeight: "bold", width: "5rem"}} defaultValue={currentRoom.bed} placeholder={currentRoom.bed} value={editRoom.editBed || currentRoom.bed} onChange={(e) => setEditRoom({...editRoom, editBed: e.target.value})} /></td>
        
                            <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white", width: "6rem",fontFamily: 'Cinzel'}}><input style={{textAlign: "center", fontSize: "80%", fontWeight: "bold", width: "5rem"}} defaultValue={currentRoom.bathroom} placeholder={currentRoom.bathroom} value={editRoom.editBathroom || currentRoom.bathroom} onChange={(e) => setEditRoom({...editRoom, editBathroom: e.target.value})} /></td>
        
                            <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white", width: "6rem",fontFamily: 'Cinzel'}}><input style={{textAlign: "center", fontSize: "80%", fontWeight: "bold", width: "3rem"}} defaultValue={currentRoom.wifi} placeholder={currentRoom.wifi ? "Yes" : "No"} value={editRoom.editWifi || currentRoom.wifi} onChange={(e) => setEditRoom({...editRoom, editWifi: e.target.value})} /></td>
        
                            <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white", width: "6rem",fontFamily: 'Cinzel'}}><input style={{textAlign: "center", fontSize: "80%", fontWeight: "bold", width: "5rem"}} defaultValue={currentRoom.madeAvailable} placeholder={currentRoom.madeAvailable} value={editRoom.editMadeAvailable || currentRoom.madeAvailable} onChange={(e) => setEditRoom({...editRoom, editMadeAvailable: e.target.value})} /></td>
                            <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white", width: "6rem",fontFamily: 'Cinzel'}}><input style={{textAlign: "center", fontSize: "80%", fontWeight: "bold", width: "4rem"}} defaultValue={currentRoom.price} placeholder={ "R" + currentRoom.price} value={editRoom.editPrice || currentRoom.price} onChange={(e) => setEditRoom({...editRoom, editPrice: e.target.value})} /></td>
                            <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white", width: "6rem",fontFamily: 'Cinzel'}}><button type="button" className="updateButton" style={{ fontSize: "80%", width: "3.5rem"}} onClick={() => updateRooms(currentRoom.id)}>Save</button></td>
                            <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white", width: "6rem",fontFamily: 'Cinzel'}}><button type="button" className="updateButton" style={{ fontSize: "80%", width: "4rem"}} onClick={() => cancelRoomUpdate(index)}>Cancel</button></td>
                        </tr>
                            ) : (
                                <tr>
                        
                            
                                <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white", width: "6rem",fontFamily: 'Cinzel', fontSize: "80%"}}>{currentRoom.suite}</td>
                                <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white", width: "6rem",fontFamily: 'Cinzel', fontSize: "80%"}}>{currentRoom.roomNumber}</td>
                                <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white", width: "6rem",fontFamily: 'Cinzel', fontSize: "80%"}}>{"Level " + currentRoom.floorLevel}</td>
                                <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white", width: "6rem",fontFamily: 'Cinzel', fontSize: "80%"}}>{currentRoom.rating}</td>
                                <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white", width: "6rem",fontFamily: 'Cinzel', fontSize: "80%"}}>{currentRoom.airConditioning}</td>
            
                                <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white", width: "6rem",fontFamily: 'Cinzel', fontSize: "80%"}}>{currentRoom.fireplace ? "Yes": "No"}</td>
            
                                <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white", width: "6rem",fontFamily: 'Cinzel', fontSize: "80%"}}>{currentRoom.balcony ? "Yes" : "No"}</td>
                                <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white", width: "6rem",fontFamily: 'Cinzel', fontSize: "80%"}}>{currentRoom.television}</td>
            
                                <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white", width: "6rem",fontFamily: 'Cinzel', fontSize: "80%"}}>{currentRoom.bed}</td>
            
                                <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white", width: "6rem",fontFamily: 'Cinzel', fontSize: "80%"}}>{currentRoom.bathroom}</td>
            
                                <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white", width: "6rem",fontFamily: 'Cinzel', fontSize: "80%"}}>{currentRoom.wifi ? "Yes" : "No"}</td>
            
                                <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white", width: "6rem",fontFamily: 'Cinzel', fontSize: "80%"}}>{currentRoom.madeAvailable}</td>
                                <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white", width: "6rem",fontFamily: 'Cinzel', fontSize: "80%"}}>{ "R" + currentRoom.price}</td>
                                <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white", width: "6rem",fontFamily: 'Cinzel', fontSize: "80%"}}><button type="button" className="updateButton"onClick={() => handleEditClick(index)}>Update</button></td>
                                
                            </tr>
                            )}
                        </React.Fragment>
                    ))} 
                    </tbody>
                    </table>
                        </>
                    )}
                
                </div>
            ) : (
                <div className="Room_Service_Management" style={{ maxHeight: "25rem",width: "67rem", overflowY: "auto", overflowX: "auto" }}>
                    {
                        isLoading ?
                        (
                            <Loader />
                        )
                        :
                        (
                            <>
                            <table style={{textAlign:"center", borderInlineStyle:"solid", marginLeft:"2rem", marginTop:"2rem",width: "64rem"}}>
                                <thead>
                <tr>
                    <th style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "black", width: "6rem",fontFamily: 'Cinzel', backgroundColor: "rgba(255,255,255,0.7)", fontSize: "80%"}}>Suite Type</th>
                    <th style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "black", width: "6rem",fontFamily: 'Cinzel', backgroundColor: "rgba(255,255,255,0.7)", fontSize: "80%"}}>Room Number</th>
                    <th style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "black", width: "6rem",fontFamily: 'Cinzel', backgroundColor: "rgba(255,255,255,0.7)", fontSize: "80%"}}>Floor Level</th>
                    <th style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "black",fontFamily: 'Cinzel', backgroundColor: "rgba(255,255,255,0.7)", fontSize: "80%"}}>Cleaned Completed</th>
                    <th style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "black",fontFamily: 'Cinzel', backgroundColor: "rgba(255,255,255,0.7)", fontSize: "80%"}}>Air Conditioning</th>
                    <th style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "black",fontFamily: 'Cinzel', backgroundColor: "rgba(255,255,255,0.7)", fontSize: "80%"}}>Fireplace</th>
                    <th style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "black",fontFamily: 'Cinzel', backgroundColor: "rgba(255,255,255,0.7)", fontSize: "80%"}}>Balcony</th>
                    <th style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "black",fontFamily: 'Cinzel', backgroundColor: "rgba(255,255,255,0.7)", fontSize: "80%"}}>Television</th>
                    <th style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "black",fontFamily: 'Cinzel', backgroundColor: "rgba(255,255,255,0.7)", fontSize: "80%"}}>Bedrooms</th>
                    <th style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "black",fontFamily: 'Cinzel', backgroundColor: "rgba(255,255,255,0.7)", fontSize: "80%"}}>Bathrooms</th>
                    <th style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "black",fontFamily: 'Cinzel', backgroundColor: "rgba(255,255,255,0.7)", fontSize: "80%"}}>Wifi</th>
                    <th style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "black",fontFamily: 'Cinzel', backgroundColor: "rgba(255,255,255,0.7)", fontSize: "80%"}}>Availability</th>
                    <th style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "black", width: "7rem",fontFamily: 'Cinzel', backgroundColor: "rgba(255,255,255,0.7)", fontSize: "80%"}}>Total Cost</th>
                    <th style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "black", width: "6rem",fontFamily: 'Cinzel', backgroundColor: "rgba(255,255,255,0.7)", fontSize: "80%"}}></th>
                </tr>
                </thead>

                <tbody> 
                {filteredRooms === 0 ? rooms.map((room, index) => (
                    <React.Fragment>

                                <tr key={room.id}>
                      
                    <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white", width: "6rem",fontFamily: 'Cinzel', fontSize: "80%"}}>{room.reservationInformation.hotelSuite}</td>
                    <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white", width: "6rem",fontFamily: 'Cinzel', fontSize: "80%"}}>{room.reservationInformation.roomNumber}</td>
                    <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white", width: "6rem",fontFamily: 'Cinzel', fontSize: "80%"}}>{"Level " + room.reservationInformation.floorLevel}</td>
                    <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)",fontFamily: 'Cinzel'}}>
                        <button style={{borderStyle:"none", backgroundColor: "whitesmoke", borderRadius: "25rem"}} type= "button" onClick={() => toggleCleanedCompleted(room.id)}>
                        <svg width="2.5rem" height="2.5rem">
                            <image href={buttonRoomServiceToggles[room.id]?.cleanedCompleted ? yes: no} alt="cleanedCompletedToggle" width="2.5rem" height="2.5rem" />
                        </svg> 
                        </button>
                        
                    </td>
                    <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)"}}>
                            <button style={{borderStyle:"none", backgroundColor: "whitesmoke", borderRadius: "25rem"}} type= "button" onClick={() => toggleAirConditioning(room.id)}>
                        <svg width="2.5rem" height="2.5rem">
                            <image href={buttonRoomServiceToggles[room.id]?.cleanedAirConditioning ? yes: no} alt="cleanedAirConditioningToggle" width="2.5rem" height="2.5rem" />
                        </svg> 
                        </button>
                        </td>

                    <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)"}}>
                            <button style={{borderStyle:"none", backgroundColor: "whitesmoke", borderRadius: "25rem"}} type= "button" onClick={() => toggleFireplace(room.id)}>
                        <svg width="2.5rem" height="2.5rem">
                            <image href={buttonRoomServiceToggles[room.id]?.cleanedFireplace ? yes: no} alt="cleanedFireplaceToggle" width="2.5rem" height="2.5rem" />
                        </svg>  
                        </button>
                        </td>

                    <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)"}}>
                            <button style={{borderStyle:"none", backgroundColor: "whitesmoke", borderRadius: "25rem"}} type= "button" onClick = {() => toggleBalcony(room.id)}>
                        <svg width="2.5rem" height="2.5rem">
                            <image href={buttonRoomServiceToggles[room.id]?.cleanedBalcony ? yes : no} alt="cleanedBalconyToggle" width="2.5rem" height="2.5rem" />
                        </svg>   
                        </button>
                        </td>
                    <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)"}}>
                        <button style={{borderStyle:"none", backgroundColor: "whitesmoke", borderRadius: "25rem"}} type= "button" onClick = {() => toggleTelevision(room.id)}>
                        <svg width="2.5rem" height="2.5rem">
                            <image href={buttonRoomServiceToggles[room.id]?.cleanedTelevision ? yes : no} alt="cleanedTelevisionToggle" width="2.5rem" height="2.5rem" />
                        </svg>    
                        </button>
                        </td>

                    <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)"}}>
                            <button style={{borderStyle:"none", backgroundColor: "whitesmoke", borderRadius: "25rem"}} type= "button" onClick = {() => toggleBedroom(room.id)}>
                        <svg width="2.5rem" height="2.5rem">
                            <image href={buttonRoomServiceToggles[room.id]?.cleanedBedroom ? yes : no} alt="cleanedBedroomToggle" width="2.5rem" height="2.5rem" />
                        </svg>    
                        </button>
                        </td>

                    <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)"}}>
                            <button style={{borderStyle:"none", backgroundColor: "whitesmoke", borderRadius: "25rem"}} type= "button" onClick = {() => toggleBathroom(room.id)}>
                        <svg width="2.5rem" height="2.5rem">
                            <image href={buttonRoomServiceToggles[room.id]?.cleanedBathroom ? yes : no} alt="cleanedBathroomToggle" width="2.5rem" height="2.5rem" />
                        </svg>   
                        </button>
                        </td>

                    <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)"}}>
                            <button style={{borderStyle:"none", backgroundColor: "whitesmoke", borderRadius: "25rem"}} type= "button" onClick ={() => toggleWifiSetUp(room.id)}>
                        <svg width="2.5rem" height="2.5rem">
                            <image href={buttonRoomServiceToggles[room.id]?.wifiSetUp ? yes : no} alt="wifiSetUpToggle" width="2.5rem" height="2.5rem" />
                        </svg>    
                        </button>
                        </td>

                    <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)"}}>
                            <button style={{borderStyle:"none", backgroundColor: "whitesmoke", borderRadius: "25rem"}} type= "button" onClick={() => toggleAvailability(room.id)}>
                                        <svg width="2.5rem" height="2.5rem">
                                            <image href={buttonRoomServiceToggles[room.id]?.availability ? yes: no} alt="availabilityToggle" width="2.5rem" height="2.5rem" />
                                        </svg> 
                            </button>
                       </td>
                    <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white", width: "6rem",fontFamily: 'Cinzel', fontSize: "80%"}}>{"R " + room.reservationInformation.price}</td>
                    <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white", width: "6rem",fontFamily: 'Cinzel', fontSize: "80%"}}><button type="button" className="updateButton" onClick={() => updateRoomService(room.id)}>Update</button></td>
                </tr>
                
                
                </React.Fragment>
                )): filteredRooms.map((room, index) => (
                    <React.Fragment>

                                <tr key={room.id}>
                      
                    <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white", width: "6rem",fontFamily: 'Cinzel', fontSize: "80%"}}>{room.reservationInformation.hotelSuite}</td>
                    <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white", width: "6rem",fontFamily: 'Cinzel', fontSize: "80%"}}>{room.reservationInformation.roomNumber}</td>
                    <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white", width: "6rem",fontFamily: 'Cinzel', fontSize: "80%"}}>{"Level " + room.reservationInformation.floorLevel}</td>
                    <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)",fontFamily: 'Cinzel'}}>
                        <button style={{borderStyle:"none", backgroundColor: "whitesmoke", borderRadius: "25rem"}} type= "button" onClick={() => toggleCleanedCompleted(room.id)}>
                        <svg width="2.5rem" height="2.5rem">
                            <image href={buttonRoomServiceToggles[room.id]?.cleanedCompleted ? yes: no} alt="cleanedCompletedToggle" width="2.5rem" height="2.5rem" />
                        </svg> 
                        </button>
                        
                    </td>
                    <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)"}}>
                            <button style={{borderStyle:"none", backgroundColor: "whitesmoke", borderRadius: "25rem"}} type= "button" onClick={() => toggleAirConditioning(room.id)}>
                        <svg width="2.5rem" height="2.5rem">
                            <image href={buttonRoomServiceToggles[room.id]?.cleanedAirConditioning ? yes: no} alt="cleanedAirConditioningToggle" width="2.5rem" height="2.5rem" />
                        </svg> 
                        </button>
                        </td>

                    <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)"}}>
                            <button style={{borderStyle:"none", backgroundColor: "whitesmoke", borderRadius: "25rem"}} type= "button" onClick={() => toggleFireplace(room.id)}>
                        <svg width="2.5rem" height="2.5rem">
                            <image href={buttonRoomServiceToggles[room.id]?.cleanedFireplace ? yes: no} alt="cleanedFireplaceToggle" width="2.5rem" height="2.5rem" />
                        </svg>  
                        </button>
                        </td>

                    <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)"}}>
                            <button style={{borderStyle:"none", backgroundColor: "whitesmoke", borderRadius: "25rem"}} type= "button" onClick = {() => toggleBalcony(room.id)}>
                        <svg width="2.5rem" height="2.5rem">
                            <image href={buttonRoomServiceToggles[room.id]?.cleanedBalcony ? yes : no} alt="cleanedBalconyToggle" width="2.5rem" height="2.5rem" />
                        </svg>   
                        </button>
                        </td>
                    <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)"}}>
                        <button style={{borderStyle:"none", backgroundColor: "whitesmoke", borderRadius: "25rem"}} type= "button" onClick = {() => toggleTelevision(room.id)}>
                        <svg width="2.5rem" height="2.5rem">
                            <image href={buttonRoomServiceToggles[room.id]?.cleanedTelevision ? yes : no} alt="cleanedTelevisionToggle" width="2.5rem" height="2.5rem" />
                        </svg>    
                        </button>
                        </td>

                    <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)"}}>
                            <button style={{borderStyle:"none", backgroundColor: "whitesmoke", borderRadius: "25rem"}} type= "button" onClick = {() => toggleBedroom(room.id)}>
                        <svg width="2.5rem" height="2.5rem">
                            <image href={buttonRoomServiceToggles[room.id]?.cleanedBedroom ? yes : no} alt="cleanedBedroomToggle" width="2.5rem" height="2.5rem" />
                        </svg>    
                        </button>
                        </td>

                    <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)"}}>
                            <button style={{borderStyle:"none", backgroundColor: "whitesmoke", borderRadius: "25rem"}} type= "button" onClick = {() => toggleBathroom(room.id)}>
                        <svg width="2.5rem" height="2.5rem">
                            <image href={buttonRoomServiceToggles[room.id]?.cleanedBathroom ? yes : no} alt="cleanedBathroomToggle" width="2.5rem" height="2.5rem" />
                        </svg>   
                        </button>
                        </td>

                    <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)"}}>
                            <button style={{borderStyle:"none", backgroundColor: "whitesmoke", borderRadius: "25rem"}} type= "button" onClick ={() => toggleWifiSetUp(room.id)}>
                        <svg width="2.5rem" height="2.5rem">
                            <image href={buttonRoomServiceToggles[room.id]?.wifiSetUp ? yes : no} alt="wifiSetUpToggle" width="2.5rem" height="2.5rem" />
                        </svg>    
                        </button>
                        </td>

                    <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)"}}>
                            <button style={{borderStyle:"none", backgroundColor: "whitesmoke", borderRadius: "25rem"}} type= "button" onClick={() => toggleAvailability(room.id)}>
                                        <svg width="2.5rem" height="2.5rem">
                                            <image href={buttonRoomServiceToggles[room.id]?.availability ? yes: no} alt="availabilityToggle" width="2.5rem" height="2.5rem" />
                                        </svg> 
                            </button>
                       </td>
                    <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white", width: "6rem",fontFamily: 'Cinzel', fontSize: "80%"}}>{"R " + room.reservationInformation.price}</td>
                    <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white", width: "6rem",fontFamily: 'Cinzel', fontSize: "80%"}}><button type="button" className="updateButton" onClick={() => updateRoomService(room.id)}>Update</button></td>
                </tr>
                
                
                </React.Fragment>
                ))}
                 </tbody>  
                </table>
                            </>
                        )
                    }
            
        </div>
            )}  
        </div>
    )
};

export default AdminRooms;