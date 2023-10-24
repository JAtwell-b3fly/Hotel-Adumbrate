import {React, useState, useEffect} from "react";
import {collection, getDocs} from "firebase/firestore";
import { db } from "../config/firebase"; 

import booked from "../images/booked.png";
import not_booked from "../images/not_booked.png";

const ReservationList = () => {

    const [reservationlist, setReservationList] = useState([])

    useEffect(() => {
        getReservations();
        console.log("reservations: ", reservationlist)
    })

    const getReservations = async() => {
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
    }

    return(
        <div className="managereservations">

            <form>
                <div className="admin_search_div">
                    <input name="searchbar"
                            type="text"
                            className="admin_searchbar"
                            placeholder="Search here..."
                    />
                </div>
            </form>

            <table style={{textAlign:"center", borderInlineStyle:"solid", marginLeft:"1rem", marginTop:"2rem"}}>
                <tr>
                    <th style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white"}}>Suite Type</th>
                    <th style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white"}}>Room Number</th>
                    <th style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white", width: "6rem"}}>Check In</th>
                    <th style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white", width: "6rem"}}>Check Out</th>
                    <th style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white", width: "8rem"}}>Special Requests</th>
                    <th style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white"}}>Number Of Days</th>
                    <th style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white"}}>Number of Adults</th>
                    <th style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white"}}>Number of Children</th>
                    <th style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white"}}>Paid</th>
                    <th style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white"}}>Booked</th>
                </tr>

                {reservationlist.map((reservation) => (
                    <>
                        <tr key={reservation.id}>
                    <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white"}}>{reservation.hotelSuite}</td>
                    <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white"}}>{reservation.roomNumber}</td>
                    <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white", width: "6rem"}}>{reservation.arrivalDate}</td>
                    <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white", width: "6rem"}}>{reservation.departureDate}</td>
                    <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white", width: "8rem"}}>{reservation.specialRequests}</td>
                    <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white"}}>{reservation.numberOfDays}</td>
                    <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white"}}>{reservation.numberOfAdults}</td>
                    <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white"}}>{reservation.numberOfChildren}</td>
                    <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)", color: "white"}}>Paid</td>
                    <td style={{textAlign:"center", border:"solid", borderColor:"rgba(229, 229, 203, 0.601)"}}><svg width="2.5rem" height="2.5rem"><image href={booked} width="100%" height="100%" /></svg></td>
                </tr>
                    </>
                ))}
                
            </table>
        </div>
    )
};

export default ReservationList;