import {React, useState, useEffect} from "react";
import { useHistory } from "react-router-dom";
import { db } from "../config/firebase"; 
import {doc, getDoc, addDoc, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const ReservationForm = ({selectedRoom}) => {

    const history = useHistory();
    const auth = getAuth();
    const user = auth.currentUser;
    const [userInfo, setUserInfo] = useState([]);

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
        const fetchData = async () => {
          if (user) {
            try {
              const userDocRef = doc(db, "users", user.email);
              const docSnap = await getDoc(userDocRef);
    
              if (docSnap.exists()) {
                const userData = docSnap.data();
                setUserInfo(userData);
                setReserveName(userData.fullName);
                setReserveEmail(userData.emailAddress);
                setReservePhysicalAddress(userData.physicalAddress);
              } else {
                console.log("No such document exists");
              }
            } catch (error) {
              console.error("Error fetching user information: ", error.message);
            }
          }
        };
    
        fetchData();
      }, [user]);

    const [reservationInformation, setReservationInformation] = useState({})

        useEffect(() => {
            // Calculate and set reservation information based on state variables
            if (user.email && user.uid && userInfo.fullName && userInfo.emailAddress && userInfo.physicalAddress) {
                setReservationInformation(prevState => {
                    const calculatedInformation = {
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
                        price: selectedRoom.price,
                        priceCalculated: selectedRoom.price * numberOfDays,
                        rating: selectedRoom.rating,
                        suite: selectedRoom.suite,
                        television: selectedRoom.television,
                        wifi: selectedRoom.wifi,
                      };
                      
                      return calculatedInformation
                })
            }
          }, [
            user.email,
            user.uid,
            userInfo.fullName,
            userInfo.emailAddress,
            userInfo.physicalAddress,
            specialRequests,
            hotelSuite,
            roomNumber,
            numberOfDays,
            numberOfAdults,
            numberOfChildren,
            arrivalDate,
            arrivalTime,
            departureDate,
            departureTime,
            selectedRoom,
          ]);

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
        const day = today.getDate();

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
        const selectedDate = new Date(event.target.value);
        const currentDate = new Date();
        
        if (selectedDate < currentDate) {
            console.error("Arrival Date has to be a future date from today")
            alert("Arrival Date has to be a future date from today")
        } else {
            setArrivalDate(event.target.value);
        }
    }

    const handleDepartureDate = (event) => {
        const selectedDate = new Date(event.target.value);
        const arrivaleDateObj = new Date(arrivalDate);

        if (selectedDate < arrivaleDateObj) {
            console.error("Departure Date has to be a future date from the Arrival Date")
            alert("Departure Date has to be a future date from the Arrival Date")
        } else {
            setDepartureDate(event.target.value)
        }
    }

    const handleArrivalTime = (event) => {
        const arrivalTime = event.target.value;
        console.log("Selected Arrival Date:", event.target.value);
        if (arrivalTime.trim() === "") {
            console.error("Arrival Time is required")
            alert("Arrival Time is required")
        } else {
            setArrivalTime(arrivalTime);
        }
    }

    const handleDepartureTime = (event) => {
        const departureTime = event.target.value;
        if(departureTime.trim() === "") {
            console.error("Departure Time is required");
            alert("Departure Time is required");
        } else {
            setDepartureTime(departureTime);
        }
    }

    useEffect(() => {
        //Check if both arrivalDate and departureDate have values
        if (arrivalDate && departureDate) {
            //Calculate stay duration and update the state
            const days = calculateStayDuration(arrivalDate, departureDate);
            setNumberOfDays(days);
        }
    }, [arrivalDate, departureDate]);

    const handleNumberOfAdults = (event) => {
        const newValueOfAdults = parseInt(event.target.value, 10);
        if (!isNaN(newValueOfAdults) && newValueOfAdults > 0 && newValueOfAdults <= 4) {
            setNumberOfAdults(newValueOfAdults);
        } else {
            console.error("Adults number should be between 0 and 5")
            alert("Adults number should be between 0 and 5")
        }
    }

    const handleNumberOfChildren = (event) => {
        const newValueChildren = parseInt(event.target.value, 10);
        if (!isNaN(newValueChildren) && newValueChildren >= 0 && newValueChildren <= 3) {
            setNumberOfChildren(newValueChildren)
        } else {
            console.error("Children number should be between 0 and 3")
            alert("Children number should be between 0 and 3")
        }
    }

    const goToUserReservation = (() => {

        history.push("/user-Reservation", reservationInformation, selectedRoom)
        alert("Reservation Information Added")
    })

    const handleProceedButtonClick = () => {
        if (
            !reserveEmail ||
            !arrivalDate ||
            !departureDate ||
            !arrivalTime ||
            !departureTime ||
            numberOfAdults === 0 ||
            arrivalDate >= departureDate
        ) {
            console.error("Cannot proceed. Please correct the form information")
            alert("Cannot proceed. Please correct the form information")
        } else {
            goToUserReservation();
        }
    }
        

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
                        onChange={handleNumberOfAdults}
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
                        onChange={handleNumberOfChildren}
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
                        onChange={handleArrivalTime}
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
                        onClick={handleProceedButtonClick}
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
                        onChange={handleDepartureTime}
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