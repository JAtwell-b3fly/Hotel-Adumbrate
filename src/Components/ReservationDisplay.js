import {React, useState, useEffect} from "react";
import {collection, getDocs, doc, updateDoc} from "firebase/firestore";
import { db } from "../config/firebase"; 

import booked from "../images/booked.png";
import not_booked from "../images/not_booked.png";

import Loader from "./Loader";

const ReservationList = () => {

    const [reservationlist, setReservationList] = useState([]);
    const [toggle, setToggle] = useState(true);
    const [booking, setBooking] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [editableRowId, setEditableRowId] = useState(null);

    const [searchTerm, setSearchTerm] = useState("");
    const [filteredReservations, setFilteredReservations] = useState([]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);

        //Filter reservations based on the search term
        const filtered = reservationlist.filter((reservation)=> 
        reservation.reservationInformation.roomNumber.includes(searchTerm))

        setFilteredReservations(filtered);
    }

    const updateReservationBooking = async(id, bookingValue) => {
        //setIsLoading(true)
        try {
            const reservation = reservationlist.find((reservation) => reservation.id === id);

            if (reservation) {
                const reservationBookingDocRef = doc(db, "reservations", id);
                const updatedData = {
                    booking: bookingValue,
                }
                await updateDoc(reservationBookingDocRef, updatedData);
                alert(`Reservation Booking updated for ${reservation.reservationInformation.name}`);
            }
        } catch (error) {
            console.error("Error updating reservation booking: ", error.message);
        }
        //setIsLoading(false)
    }

    const handleBooking = async(id) => {
       const reservationToUpdate = reservationlist.find((reservation) => reservation.id === id);

       if (reservationToUpdate) {
         //Toggle the booking state locally
         setReservationList((prevList) =>
            prevList.map((reservation) => 
                reservation.id === id
                ? {...reservation, booked: !reservation.booked}
                : reservation))
        
        //Update the booking state in Firestore
        await updateReservationBooking(id, !reservationToUpdate.booked);
       }
    }

    useEffect(() => {
        getReservations();
    }, [])

    const getReservations = async() => {
        setIsLoading(true)
        try {
          const querySnapShot = await getDocs(collection(db, "reservations"));

          const data = querySnapShot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
          }))

          setReservationList(data);
          console.log(data);
        } catch (error) {
            console.log("Error fetching reservations made: ", error.message)
        }
        setIsLoading(false)
    }

    

    return(
        <div className="managereservations">

            <form>
                <div className="admin_search_div">
                    <input name="searchbar"
                            type="text"
                            className="admin_searchbar"
                            placeholder="Search here..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                    />
                </div>
            </form>

            {
                isLoading ?
                (
                    <Loader />
                )
                :
                (
                    <>
                    <div style={{ maxHeight: "25rem",width: "65rem", overflowY: "auto"}}>
                    <table style={{textAlign:"center", borderInlineStyle:"solid", marginLeft:"1rem", marginTop:"2rem", marginRight: "1rem"}}>
                <tr>
                    <th style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "black",fontFamily: 'Cinzel', width: "6rem", backgroundColor: "rgba(255,255,255,0.7)", fontSize: "80%"}}>Suite Type</th>
                    <th style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "black",fontFamily: 'Cinzel', width: "6rem", backgroundColor: "rgba(255,255,255,0.7)", fontSize: "80%"}}>Room Number</th>
                    <th style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "black",fontFamily: 'Cinzel', width: "6rem", backgroundColor: "rgba(255,255,255,0.7)", fontSize: "80%"}}>Check In</th>
                    <th style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "black",fontFamily: 'Cinzel', width: "6rem", backgroundColor: "rgba(255,255,255,0.7)", fontSize: "80%"}}>Check Out</th>
                    <th style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "black",fontFamily: 'Cinzel', width: "6rem", backgroundColor: "rgba(255,255,255,0.7)", fontSize: "80%"}}>Special Requests</th>
                    <th style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "black",fontFamily: 'Cinzel', width: "6rem", backgroundColor: "rgba(255,255,255,0.7)", fontSize: "80%"}}>Number Of Days</th>
                    <th style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "black",fontFamily: 'Cinzel', width: "6rem", backgroundColor: "rgba(255,255,255,0.7)", fontSize: "80%"}}>Number of Adults</th>
                    <th style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "black",fontFamily: 'Cinzel', width: "6rem", backgroundColor: "rgba(255,255,255,0.7)", fontSize: "80%"}}>Number of Children</th>
                    <th style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "black",fontFamily: 'Cinzel', width: "6rem", backgroundColor: "rgba(255,255,255,0.7)", fontSize: "80%"}}>Available</th>
                    <th style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "black",fontFamily: 'Cinzel', width: "6rem", backgroundColor: "rgba(255,255,255,0.7)", fontSize: "80%"}}>Booked</th>
                </tr>

                {filteredReservations.length === 0 ? 
                reservationlist.map((reservation) => (
                    <>
                <tr key={reservation.id}>
                    <td className="manageReservationsTableHeaders1">{reservation.reservationInformation.hotelSuite}</td>
                    <td className="manageReservationsTableHeaders1">{reservation.reservationInformation.roomNumber}</td>
                    <td className="manageReservationsTableHeaders1" style={{width: "6rem"}}>{reservation.reservationInformation.arrivalDate}</td>
                    <td className="manageReservationsTableHeaders1" style={{width: "6rem"}}>{reservation.reservationInformation.departureDate}</td>
                    <td className="manageReservationsTableHeaders1" style={{width: "8rem"}}>{reservation.reservationInformation.specialRequests}</td>
                    <td className="manageReservationsTableHeaders1">{reservation.reservationInformation.numberOfDays}</td>
                    <td className="manageReservationsTableHeaders1">{reservation.reservationInformation.numberOfAdults}</td>
                    <td className="manageReservationsTableHeaders1">{reservation.reservationInformation.numberOfChildren}</td>
                    <td className="manageReservationsTableHeaders1">{reservation.reservationInformation.madeAvailable}</td>
                    <td className="manageReservationsTableHeaders1">
                        <button style={{borderStyle:"none", backgroundColor: "whitesmoke", borderRadius: "25rem"}} type= "button" onClick={() => handleBooking(reservation.id)}>
                        <svg width="2.5rem" height="2.5rem"><image href={reservation.booked ? booked: not_booked} width="100%" height="100%" /></svg>
                        </button></td>
                </tr>
                    </>
                )) : filteredReservations.map((reservation) => (
                    <>
                <tr key={reservation.id}>
                    <td className="manageReservationsTableHeaders1">{reservation.reservationInformation.hotelSuite}</td>
                    <td className="manageReservationsTableHeaders1">{reservation.reservationInformation.roomNumber}</td>
                    <td className="manageReservationsTableHeaders1" style={{width: "6rem"}}>{reservation.reservationInformation.arrivalDate}</td>
                    <td className="manageReservationsTableHeaders1" style={{width: "6rem"}}>{reservation.reservationInformation.departureDate}</td>
                    <td className="manageReservationsTableHeaders1" style={{width: "8rem"}}>{reservation.reservationInformation.specialRequests}</td>
                    <td className="manageReservationsTableHeaders1">{reservation.reservationInformation.numberOfDays}</td>
                    <td className="manageReservationsTableHeaders1">{reservation.reservationInformation.numberOfAdults}</td>
                    <td className="manageReservationsTableHeaders1">{reservation.reservationInformation.numberOfChildren}</td>
                    <td className="manageReservationsTableHeaders1">{reservation.reservationInformation.madeAvailable}</td>
                    <td className="manageReservationsTableHeaders1">
                        <button style={{borderStyle:"none", backgroundColor: "whitesmoke", borderRadius: "25rem"}} type= "button" onClick={() => handleBooking(reservation.id)}>
                        <svg width="2.5rem" height="2.5rem"><image href={reservation.booked ? booked: not_booked} width="100%" height="100%" /></svg>
                        </button></td>
                </tr>
                    </>
                ))}
            </table>
            </div>
                    </>
                )
            }
            
        </div>
    )
};

export default ReservationList;