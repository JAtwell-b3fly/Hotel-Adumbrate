import {React, useState} from "react";
import { db } from "../config/firebase"; 
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";

const AddRooms = () => {

    //variables to store all the form data into when adding a new room
    const [suiteType, setSuiteType] = useState("");
    const [roomNumber, setRoomNumber] = useState("");
    const [floorLevel, setFloorLevel] = useState(0);
    const [price, setPrice] = useState(0);
    const [hasFirePlace, setHasFirePlace] = useState(false);
    const [hasBalcony, setHasBalcony] = useState(false);
    const [hasAirConditioning, setHasAirConditioning] = useState(false);
    const [hasTelevision, setHasTelevision] = useState(false);
    const [hasWifi, setHasWifi] = useState(false);
    const [beds, setBeds] = useState(0);
    const [bathrooms, setBathrooms] = useState(0);
    const [rating, setRating] = useState(0);
    const [shortDescription, setShortDescription] = useState("");
    const [longDescription, setLongDescription] = useState("");
    const [madeAvailable, setMadeAvailable] = useState("Yes");
    const [airConditioning, setAirConditioning] = useState(0);
    const [television, setTelevision] = useState(0);
    const [image, setImage] = useState("");
    const [name, setName] = useState("");

    //function to change the state if this room has a fireplace or not
    const handleHasFirePlaceChange = (event) => {
        event.preventDefault();

        setHasFirePlace(event.target.checked);
    };

    //function to change the state if this room has a balcony or not
    const handleHasBalconyChange = (event) => {
        event.preventDefault();

        setHasBalcony(event.target.checked);
    };

    //function to change the state if this room has airconditioning or not
    const handleHasAirConditioning = (event) => {
        event.preventDefault();

        setHasAirConditioning(event.target.checked);
    };

    //function to change the state if this room has television or not
    const handleHasTelevision = (event) => {
        event.preventDefault();

        setHasTelevision(event.target.checked);
    };

    //function to change the state if this room has wifi or not
    const handleHasWifi = (event) => {
        event.preventDefault();

        setHasWifi(event.target.checked);
    }

    const addNewRoom = async () => {
        try {
            // Query for existing rooms with the same suite type
            const querySnapshot = await getDocs(
                query(collection(db, "availableRooms"), where("suiteType", "==", suiteType))
            );
    
            // Count the existing rooms
            const roomCount = querySnapshot.size;
    
            // Generate a unique number based on the count
            const uniqueNumber = roomCount + 1;
    
            // Create the document ID with the suite type and unique number
            const docId = `${suiteType}_${uniqueNumber}`;
    
            // Add the new room
            await addDoc(collection(db, "availableRooms"), {
                suiteType: suiteType,
                roomNumber: roomNumber,
                floorLevel: floorLevel,
                price: price,
                hasFirePlace: hasFirePlace,
                hasBalcony: hasBalcony,
                hasAirConditioning: hasAirConditioning,
                hasTelevision: hasTelevision,
                hasWifi: hasWifi,
                beds: beds,
                bathrooms: bathrooms,
                rating: rating,
                shortDescription: shortDescription,
                longDescription: longDescription,
                madeAvailable: madeAvailable,
                name: name,
                image: image,
                television: television,
                airConditioning: airConditioning,
            });
    
            alert("New Room Added To The System");
    
            // Reset your state variables here
            setSuiteType("");
            setRoomNumber("");
            setFloorLevel(0);
            setPrice(0);
            setHasFirePlace(false);
            setHasBalcony(false);
            setHasAirConditioning(false);
            setHasTelevision(false);
            setHasWifi(false);
            setBeds(0);
            setBathrooms(0);
            setRating(0);
            setShortDescription("");
            setLongDescription("");
            setMadeAvailable("Yes");
            setTelevision(0);
            setAirConditioning(0);
            setName("");
            setImage("");
    
        } catch (error) {
            console.log("Error: " + error.message);
        }
    };
    
    return(
        <div className="addrooms">
            <h1 className="add_room_heading" style={{color: "white"}}>Add Rooms</h1>
             <form className="form_div" onSubmit={addNewRoom}  style={{ maxHeight: "35rem", width: "66rem", overflowY: "auto" }}>
                <div style={{display:"flex", flexDirection:"row"}}>
                <div style={{display:"flex", flexDirection:"column"}}>
                <div className="input_div">
                    <label className="reservation_label" style={{color: "white"}}>Suite Type</label>
                    <select
                        name="suiteType"
                        defaultValue="Single"
                        onChange={(event) => setSuiteType(event.target.value)}
                        style={{width:"10rem"}}
                        className="reservation_input"
                    >
                        <option value="Family">Family</option>
                        <option value="Couple">Couple</option>
                        <option value="Single">Single</option>
                    </select>
                </div>

                <div className="input_div">
                    <label className="reservation_label" style={{color: "white"}}>Room Number</label>
                    <input
                        name="roomNumber"
                        type="text"
                        placeholder="Room 100"
                        onChange={(event) => setRoomNumber(event.target.value)}
                        style={{width:"10rem"}}
                        className="reservation_input"
                    />
                </div>

                <div className="input_div">
                    <label className="reservation_label" style={{color: "white"}}>Floor Level</label>
                    <input
                        name="floorLevel"
                        type="number"
                        placeholder="Level 2"
                        onChange={(event) => setFloorLevel(event.target.value)}
                        style={{width:"10rem"}}
                        className="reservation_input"
                    />
                </div>  

                <div className="input_div">
                    <label className="reservation_label" style={{color: "white"}}>Price</label>
                    <input
                        name="price"
                        type="number"
                        id="priceInput"
                        placeholder="R 599.99"
                        onChange={(event) => setPrice(event.target.value)}
                        style={{width:"10rem"}}
                        className="reservation_input"
                    />
                </div>

                <div className="input_div">
                    <label className="reservation_label" style={{color: "white"}}>Air Conditioning</label>
                    <input
                        name="airConditioning"
                        type="number"
                        placeholder={1}
                        onChange={(event) => setAirConditioning(event.target.value)}
                        style={{width:"10rem"}}
                        className="reservation_input"
                    />
                </div>

                <div className="input_div">
                    <label className="reservation_label" style={{color: "white"}}>Television</label>
                    <input
                        name="television"
                        type="number"
                        placeholder={1}
                        onChange={(event) => setTelevision(event.target.value)}
                        style={{width:"10rem"}}
                        className="reservation_input"
                    />
                </div>
            </div>




            <div style={{display:"flex", flexDirection:"column", marginLeft:"3rem"}}>
                <div className="input_div">
                    <label className="reservation_label" style={{color: "white"}}>Beds</label>
                    <input
                        name="beds"
                        type="number"
                        placeholder="2"
                        onChange={(event) => setBeds(event.target.value)}
                        style={{width:"10rem"}}
                        className="reservation_input"
                    />
                </div>

                <div className="input_div">
                    <label className="reservation_label" style={{color: "white"}}>Bathrooms</label>
                    <input
                        name="bathrooms"
                        type="number"
                        placeholder="1"
                        onChange={(event) => setBathrooms(event.target.value)}
                        style={{width:"10rem"}}
                        className="reservation_input"
                    />
                </div>

                <div className="input_div">
                    <label className="reservation_label" style={{color: "white"}}>Rating</label>
                    <input
                        name="rating"
                        type="number"
                        placeholder={3}
                        onChange={(event) => setRating(event.target.value)}
                        style={{width:"10rem"}}
                        className="reservation_input"
                    />
                </div>

                <div className="input_div">
                    <label className="reservation_label" style={{color: "white"}}>Made Available</label>
                    <select
                        name="madeAvailable"
                        defaultValue="Yes"
                        onChange={(event) => setMadeAvailable(event.target.value)}
                        style={{width:"10rem"}}
                        className="reservation_input"
                    >
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                </div>

                <div className="input_div">
                    <label className="reservation_label" style={{color: "white"}}>Name</label>
                    <input
                        name="name"
                        type="text"
                        placeholder="Forest Haven"
                        onChange={(event) => setName(event.target.value)}
                        style={{width:"10rem"}}
                        className="reservation_input"
                    />
                </div>

                <div className="input_div">
                    <label className="reservation_label" style={{color: "white"}}>Image</label>
                    <input
                        name="image"
                        type="text"
                        placeholder="http://image-url-in-firestorage"
                        onChange={(event) => setImage(event.target.value)}
                        style={{width:"10rem"}}
                        className="reservation_input"
                    />
                </div>
            </div>

            <div style={{display:"flex", flexDirection:"column", marginLeft:"3rem"}}>
                <div className="input_div">
                    <label className="reservation_label" style={{color: "white"}}>Short Description</label>
                    <input
                        name="shortDescription"
                        type="text"
                        placeholder="Short Description Describing The Room"
                        onChange={(event) => setShortDescription(event.target.value)}
                        style={{width:"35rem", height:"3rem"}}
                        className="reservation_input"
                    />
                </div>

                <div className="input_div">
                    <label className="reservation_label" style={{color: "white"}}>Long Description</label>
                    <input
                        name="longDescription"
                        type="text"
                        placeholder="Long Description Describing The Room"
                        onChange={(event) => setLongDescription(event.target.value)}
                        style={{width:"35rem", height:"10rem"}}
                        className="reservation_input"
                    />
                </div>

            </div>
            </div>



            <div>
                <h6 className="reservation_label" style={{color: "white"}}>Perks</h6>
                    <div style={{display:"flex", flexDirection:"row", marginBottom:"1rem",}}>
                    <label className="reservation_label" style={{color: "white", marginRight: "0.5rem"}}>Fireplace</label>
                    <input
                        name="hasFirePlace"
                        type="checkbox"
                        checked={hasFirePlace}
                        onChange={handleHasFirePlaceChange}
                        className="reservation_input"
                        style={{width:"1rem", height:"1rem"}}
                    />
                    
                    <label className="reservation_label" style={{color: "white", marginRight: "0.5rem"}}>Balcony</label>
                    <input
                        name="hasBalcony"
                        type="checkbox"
                        checked={hasBalcony}
                        onChange={handleHasBalconyChange}
                        className="reservation_input"
                        style={{width:"1rem", height:"1rem"}}
                    />

                    <label className="reservation_label" style={{color: "white", marginRight: "0.5rem"}}>Air Conditioning</label>
                    <input
                        name="hasAirConditioning"
                        type="checkbox"
                        checked={hasAirConditioning}
                        onChange={handleHasAirConditioning}
                        className="reservation_input"
                        style={{width:"1rem", height:"1rem"}}
                    />

                    <label className="reservation_label" style={{color: "white", marginRight: "0.5rem"}}>Television</label>
                    <input
                        name="hasTelevision"
                        type="checkbox"
                        checked={hasTelevision}
                        onChange={handleHasTelevision}
                        className="reservation_input"
                        style={{width:"1rem", height:"1rem"}}
                    />

                    <label className="reservation_label" style={{color: "white", marginRight: "0.5rem"}}>Wifi</label>
                    <input
                        name="hasWifi"
                        type="checkbox"
                        checked={hasWifi}
                        onChange={handleHasWifi}
                        className="reservation_input"
                        style={{width:"1rem", height:"1rem"}}
                    />
                </div>

                </div>  

                <div className="reserve_room_button_div">
                    <button
                        type="button"
                        name="addNewRoom"
                        className="reserve_room_button"
                        style={{marginLeft:"39rem", position:"absolute", top: "35rem"}}
                        onClick={addNewRoom}
                    >
                         <p className="reserve_button_text">Add New Room</p> 
                    </button>
                </div>          
             </form>
        </div>
    )
};

export default AddRooms;