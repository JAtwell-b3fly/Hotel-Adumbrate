import {React, useState, useEffect} from "react";
import { useHistory } from "react-router-dom";
import { db } from "../config/firebase"; 
import {doc, getDoc, addDoc, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useLocation } from "react-router-dom";

const ReservationForm = () => {

    const history = useHistory();
    const {state} = useLocation();
    const selectedRoom = state;
    const auth = getAuth();
    const user = auth.currentUser;
    const [userInfo, setUserInfo] = useState([]);

    useEffect(() => {
        pullUserInfo();
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

    useEffect(() => {
        setReservationInformation({
            userEmail: user.email,
            userUID: user.uid,
            reservationMadeDate: getTodayDate(),
            referenceNumber: getReferenceNumber(),
            name: userInfo.fullName,
            email: userInfo.emailAddress,
            physicalAddress: userInfo.physicalAddress,
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
            price: selectedRoom.price * numberOfDays,
            rating: selectedRoom.rating,
            suite: selectedRoom.suite,
            television: selectedRoom.television,
            wifi: selectedRoom.wifi,
        })
    })
    const [reservationInformation, setReservationInformation] = useState({})

    const goToUserReservation = (() => {
        history.push("/user-Reservation", reservationInformation, selectedRoom)
        alert("Reservation Information Added")
    })

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

    function getTodayDate() {
        const today = new Date();

        //Extract the components of the date
        const year = today.getFullYear();
        const month = today.getMonth() + 1;
        const day = today.getDay();

        //Create a string in the format "YYY-MM-DD"
        const formattedDate = `${year}-${month < 10 ? '0' : ""}${month}-${day < 10 ? '0' : ''}${day}`;

        return formattedDate;
    }

    function getReferenceNumber () {
        //Generate a random 8 digit number
        const randomDigits = Math.floor(10000000 + Math.random() * 90000000);

        //Create the reference number by prepending "RN"
        const referenceNumber = `RN${randomDigits}`;

        return referenceNumber;
    }

    const handleArrivalDate = (event) => {
        setArrivalDate(event.target.value);
    }

    const handleDepartureDate = (event) => {
        setDepartureDate(event.target.value);
    }

    useEffect(() => {

        //Check if both arrivalDate and departureDate have values
        if (arrivalDate && departureDate) {
            //Calculate stay duration and update the state
            const days = calculateStayDuration(arrivalDate, departureDate);
            setNumberOfDays(days);
        }
    }, [arrivalDate, departureDate]);
        

    return(
        <div>
            <div className="reservation_form_box">
                <div className="reservationform">
                    {selectedRoom ? (
                        <>
                        <form>
            
            <div style={{display:"flex"}}>
                <div className="reservation_input_div" style={{marginRight:"6rem"}}>
                    <label className="reservation_label" style={{color: "white"}}>Full Name</label>
                    <input
                        name="reserveName"
                        type="text"
                        value={userInfo.fullName}
                        className="reservation_input"
                        placeholder={userInfo.fullName}
                        readOnly
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
                        readOnly
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
                        value={userInfo.emailAddress}
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
                        onChange={(event) => {
                            const newValueOfAdults = event.target.value;
                            if (!isNaN(newValueOfAdults) && newValueOfAdults >= 0 && newValueOfAdults <= 5)
                            setNumberOfAdults(newValueOfAdults)
                        }}
                        style={{width:"11rem"}}
                        type="number"
                        defaultValue={0}
                        max="5"
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
                        value={userInfo.physicalAddress}
                        style={{height:"4rem"}}
                        type="text"
                        readOnly
                    />
                </div>

                <div className="reservation_input_div">
                    <label className="reservation_label"  style={{marginLeft:"1rem", color: "white"}}>Number of Children</label>
                    <input
                        name="numberOfChildren"
                        placeholder="0"
                        className="reservation_input"
                        value={numberOfChildren}
                        onChange={(event) => {
                            const newValueChildren = event.target.value;

                            if(!NaN(newValueChildren) && newValueChildren >= 0 && newValueChildren <= 5) {
                                setNumberOfChildren(newValueChildren);
                            }
                        }}
                        style={{width:"11rem"}}
                        type="number"
                        defaultValue={0}
                        max="5"
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
                        maxLength={300}
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
                        onClick={goToUserReservation}
                    >
                            <p className="reserve_button_text">Proceed</p> 
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
                            <p style={{color: "white", position: "relative", fontSize: "100%", marginTop: "20rem", textAlign: "center"}}>Selected A Room First To Make A Reservation</p>
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