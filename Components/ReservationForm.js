import {React, useState, useEffect} from "react";
import { useHistory } from "react-router-dom";
import { db } from "../config/firebase"; 
import {doc, setDoc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useLocation } from "react-router-dom";

const ReservationForm = () => {

    const history = useHistory();
    const {state} = useLocation();
    const selectedRoom = state;
    const auth = getAuth();
    const user = auth.currentUser;
    const [userInfo, setUserInfo] = useState([]);

    const goToBrowse = (() => {
        history.push("/browse")
    });

    useEffect(() => {
        pullUserInfo();
        console.log("User Data:", userInfo);
    })

    const pullUserInfo = async() => {
         if (user) {
            try {
                const userDocRef = doc(db, "users", user.email);
                const docSnap = await getDoc(userDocRef);

                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    setUserInfo(userData);
                } else {
                    console.log("No such document exists")
                }
            } catch (error) {
                console.error("Error the user information: ", error.message)
            }
        }
    }

    const [reserveName, setReserveName] = useState(userInfo.fullName);
    const [reserveEmail, setReserveEmail] = useState(userInfo.emailAddress);
    const [reservePhysicalAddress, setReservePhysicalAddress] = useState(userInfo.physicalAddress);
    const [specialRequests, setSpecialRequests] = useState("None");
    const [hotelSuite, setHotelSuite] = useState(selectedRoom.suite);
    const [roomNumber, setRoomNumber] = useState(selectedRoom.roomNumber);
    const [numberOfDays, setNumberOfDays] = useState("0");
    const [numberOfAdults, setNumberOfAdults] = useState(0);
    const [numberOfChildren, setNumberOfChildren] = useState(0);
    const [arrivalDate, setArrivalDate] = useState("");
    const [arrivalTime, setArrivalTime] = useState("");
    const [departureDate, setDepartureDate] = useState("");
    const [departureTime, setDepartureTime] = useState("");

    //Function to calculate the number of days spent at the hotel
    function calculateStayDuration(arrivalDate, departureDate) {
        //Parse the dates into JavaScript Date objects
        const arrival = new Date(arrivalDate);
        const departure = new Date(departureDate);

        //Calculate the time difference in milliseconds
        const timeDifference = departure - arrival;

        //Calculate the number of days (milliseconds /24 hours /60 minutes / 60 seconds)
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

        return days;
    }

    const handleArrivalDate = (event) => {
        setArrivalDate(event.target.value);
    }

    const handleDepartureDate = (event) => {
        setDepartureDate(event.target.value);
    }

    useEffect(() => {

        //handleArrivalDate();
        //handleDepartureDate();

        //Check if both arrivalDate and departureDate have values
        if (arrivalDate && departureDate) {
            //Calculate stay duration and update the state
            const days = calculateStayDuration(arrivalDate, departureDate);
            setNumberOfDays(days);
        }
    }, [arrivalDate, departureDate]);

    const addReservation = (async() => {

        try {
            if(user && user.uid) {
                const userDocRef = doc(db, "reservations", user.email);
                await setDoc(userDocRef, {
                    reserveName: userInfo.fullName,
                    reserveEmail: userInfo.emailAddress,
                    reservePhysicalAddress: userInfo.physicalAddress,
                    specialRequests: specialRequests,
                    hotelSuite: hotelSuite,
                    roomNumber: roomNumber,
                    numberOfDays: numberOfDays,
                    numberOfAdults: numberOfAdults,
                    numberOfChildren: numberOfChildren,
                    arrivalDate: arrivalDate,
                    arrivalTime: arrivalTime,
                    departureDate: departureDate,
                    depatureTime: departureTime,
                    airConditioning : selectedRoom.airConditioning,
                    balcony: selectedRoom.balcony,
                    bathroom: selectedRoom.bathroom,
                    bed: selectedRoom.bed,
                    fireplace: selectedRoom.fireplace,
                    floorLevel: selectedRoom.floorLevel,
                    hasAirConditioning: selectedRoom.hasAirConditioning,
                    hasTelevision: selectedRoom.hasTelevision,
                    image: selectedRoom.image,
                    longDescription: selectedRoom.longDescription,
                    shortDescription: selectedRoom.shortDescription,
                    madeAvailable: selectedRoom.madeAvailable,
                    roomName: selectedRoom.name,
                    price: selectedRoom.price,
                    rating: selectedRoom.rating,
                    suite: selectedRoom.suite,
                    television: selectedRoom.television,
                    wifi: selectedRoom.wifi,
                })
                alert("Reservation Made");
                goToBrowse();

                setReserveName("");
                setReserveEmail("");
                setReservePhysicalAddress("");
                setHotelSuite("");
                setRoomNumber("");
                setNumberOfDays("0");
                setNumberOfAdults(0);
                setNumberOfChildren(0);
                setArrivalDate("");
                setArrivalTime("");
                setDepartureDate("");
                setDepartureTime("");
                
            }
        } catch (error) {
            console.log("Error" + error.message);
        }

    });
        

    return(
        <div>
            <div className="reservation_form_box">
                <div className="reservationform">
                    {selectedRoom ? (
                        <>
                        <form onSubmit={addReservation}>
            
            <div style={{display:"flex"}}>
                <div className="reservation_input_div" style={{marginRight:"6rem"}}>
                    <label className="reservation_label" style={{color: "white"}}>Full Name</label>
                    <input
                        name="reserveName"
                        type="text"
                        value={reserveName}
                        onChange={(event) => setReserveName(event.target.value)}
                        className="reservation_input"
                        placeholder={userInfo.fullName}
                    />
                </div>
               
                <div className="reservation_input_div" style={{marginRight: "2rem"}}>
                    <label className="reservation_label" style={{marginLeft:"1rem", color: "white"}}>Hotel Suite</label>
                    <input name="hotelSuite"
                            className="reservation_input"
                            value={selectedRoom.suite + " Suite"}
                            style={{width:"11rem"}}
                            placeholder={selectedRoom.suite}
                            type="text"
                    />
                </div>

                <div className="reservation_input_div">
                    <label className="reservation_label" style={{marginLeft:"1rem", color: "white"}}>Room Number</label>
                    <input
                        name="roomNumber"
                        type="text"
                        className="reservation_input"
                        value={selectedRoom.roomNumber}
                        style={{width:"11rem"}}
                        placeholder={selectedRoom.roomNumber}
                    />
                </div>
               
                
            </div>
                     
            <div style={{display:"flex"}}>

                <div className="reservation_input_div"  style={{marginRight:"6rem"}}>
                    <label className="reservation_label" style={{color: "white"}}>Email Address</label>
                    <input
                        name="reserveEmail"
                        type="email"
                        className="reservation_input"
                        value={reserveEmail}
                        onChange={(event) => setReserveEmail(event.target.value)}
                        placeholder={userInfo.emailAddress}
                    />
                </div>

                <div className="reservation_input_div" style={{marginRight: "2rem"}}>
                    <label className="reservation_label"  style={{marginLeft:"1rem", color: "white"}}>Number of Days</label>
                    <input
                        name="numberOfDays"
                        placeholder={numberOfDays}
                        className="reservation_input"
                        value={numberOfDays}
                        style={{width:"11rem"}}
                        type="text"
                        readOnly
                    />
                </div>

                <div className="reservation_input_div" style={{marginRight: "2rem"}}>
                    <label className="reservation_label"  style={{marginLeft:"1rem", color: "white"}}>Number of Adults</label>
                    <input
                        name="numberOfAdults"
                        placeholder="0"
                        className="reservation_input"
                        value={numberOfAdults}
                        onChange={(event) => setNumberOfAdults(event.target.value)}
                        style={{width:"11rem"}}
                        type="number"
                        defaultValue={0}
                    />
                </div>

            </div>

            <div style={{display:"flex"}}>

                <div className="reservation_input_div"  style={{marginRight:"6rem"}}>
                    <label className="reservation_label" style={{color: "white"}}>Physical Address</label>
                    <input
                        name="reservePhysicalAddress"
                        placeholder={userInfo.physicalAddress}
                        className="reservation_input"
                        value={reservePhysicalAddress}
                        onChange={(event) => setReservePhysicalAddress(event.target.value)}
                        style={{height:"4rem"}}
                        type="text"
                    />
                </div>

                <div className="reservation_input_div">
                    <label className="reservation_label"  style={{marginLeft:"1rem", color: "white"}}>Number of Children</label>
                    <input
                        name="numberOfChildren"
                        placeholder="0"
                        className="reservation_input"
                        value={numberOfChildren}
                        onChange={(event) => setNumberOfChildren(event.target.value)}
                        style={{width:"11rem"}}
                        type="number"
                        defaultValue={0}
                        />
                </div>

            </div>
            
            <div style={{display:"flex"}}>

                <div className="reservation_input_div"  style={{marginRight:"6rem"}}>
                    <label className="reservation_label" style={{color: "white"}}>Special Requests</label>
                    <input
                        name="specialRequests"
                        type="text"
                        className="reservation_input"
                        value={specialRequests}
                        onChange={(event) => setSpecialRequests(event.target.value)}
                        style={{height:"4rem"}}
                        placeholder="Special Requests"
                    />
                </div>

                <div className="reservation_input_div" style={{marginRight: "2rem"}}>
                    <label className="reservation_label"  style={{marginLeft:"1rem", color: "white"}}>Arrival Date</label>
                    <input
                        name="arrivalDate"
                        placeholder="dd/mm/yyyy"
                        className="reservation_input"
                        value={arrivalDate}
                        onChange={handleArrivalDate}
                        style={{width:"11rem"}}
                        type="date"
                    />
                </div>

                <div className="reservation_input_div" style={{marginRight: "2rem"}}>
                    <label className="reservation_label"  style={{marginLeft:"1rem", color: "white"}}>Arrival Time</label>
                    <input
                        name="arrivalTime"
                        placeholder="hh:mm"
                        className="reservation_input"
                        value={arrivalTime}
                        onChange={(event) => setArrivalTime(event.target.value)}
                        type="time"
                    />
                </div>

            </div>
            
            <div style={{display:"flex"}}>
                <div className="reserve_room_button_div" style={{marginTop:"2rem"}}>
                    <button
                        name="Reserve_Room"
                        type="button"
                        className="reserve_room_button"
                        onClick={addReservation}
                    >
                            <p className="reserve_button_text">Reserve Room</p> 
                    </button>
                </div>

                <div className="reservation_input_div" style={{marginRight: "2rem", marginLeft:"12.5rem"}}>
                    <label className="reservation_label"  style={{marginLeft:"1rem", color: "white"}}>Departure Date</label>
                    <input
                        name="departureDate"
                        placeholder="dd/mm/yyyy"
                        className="reservation_input"
                        value={departureDate}
                        onChange={handleDepartureDate}
                        style={{width:"11rem"}}
                        type="date"
                    />
                </div>

                <div className="reservation_input_div" style={{marginRight: "2rem"}}>
                    <label className="reservation_label"  style={{marginLeft:"1rem", color: "white"}}>Departure Time</label>
                    <input
                        name="departureTime"
                        placeholder="hh:mm"
                        className="reservation_input"
                        value={departureTime}
                        onChange={(event) => setDepartureTime(event.target.value)}
                        style={{width:"11rem"}}
                        type="time"
                    />
                </div>
            </div>
            </form>
                        </>
                        )
                        :
                        (
                        <>
                            <p>Selected A Room First To Make A Reservation</p>
                        </>
                        ) 
                    }
                    
                </div>

                {selectedRoom ? (
                    <>
                        <div className="suite_image_div">
                                <svg width= "100%" height="100%" className="suite_image">
                                    <image href={selectedRoom.image} height="100%" width= "100%" />
                                </svg> 
                        </div>
                    </>
                ):(
                    null
                )}

                

            </div>

        </div>
    )
};

export default ReservationForm;