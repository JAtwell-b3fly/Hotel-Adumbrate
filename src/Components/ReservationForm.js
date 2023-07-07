import React from "react";
import { useHistory } from "react-router-dom";
import { db } from "../config/firebase";
import {collection, addDoc} from "firebase/firestore";

import single_suite_1 from "../images/Hotel Room Couple 1.png";

const ReservationForm = (props) => {

    const history = useHistory();

    const completeReservation = (() => {
        alert("Reservation Successfully Made");
        history.push("/browse");
    });

    const add = (() => {
        //props.add(name, hotelSuite, roomNumber, email, numberOfDays, numberOfAdults,)
    })

    return(
        <div>
            <div className="reservation_form_box">
                <div className="reservationform">
            
                    <div style={{display:"flex"}}>
                        <div className="reservation_input_div" style={{marginRight:"100px"}}>
                            <label className="reservation_label">Full Name</label>
                            <input
                                name="fullName"
                                type="text"
                                className="reservation_input"
                                placeholder="Full Name"
                            />
                        </div>
                       
                        <div className="reservation_input_div" style={{marginRight: "20px"}}>
                            <label className="reservation_label" style={{marginLeft:"10px"}}>Hotel Suite</label>
                            <select
                                name="hotelSuite"
                                className="reservation_input"
                                style={{width:"180px"}}
                                defaultValue="Single Suite"
                            >
                                <option value="Single Suite">Single Suite</option>
                                <option value="Couple Suite">Couple Suite</option>
                                <option value="Family Suite">Family Suite</option>
                            </select>
                        </div>

                        <div className="reservation_input_div">
                            <label className="reservation_label" style={{marginLeft:"10px"}}>Room Number</label>
                            <input
                                name="roomNumber"
                                type="number"
                                className="reservation_input"
                                style={{width:"180px"}}
                                placeholder="Room Number"
                            />
                        </div>
                       
                        
                    </div>
                             
                    <div style={{display:"flex"}}>

                        <div className="reservation_input_div"  style={{marginRight:"100px"}}>
                            <label className="reservation_label">Email Address</label>
                            <input
                                name="emailAddress"
                                type="email"
                                className="reservation_input"
                                placeholder="Email Address"
                            />
                        </div>

                        <div className="reservation_input_div" style={{marginRight: "20px"}}>
                            <label className="reservation_label"  style={{marginLeft:"10px"}}>Number of Days</label>
                            <input
                                name="numberOfDays"
                                placeholder="calculated number of days"
                                className="reservation_input"
                                style={{width:"180px"}}
                                type="number"
                            />
                        </div>

                        <div className="reservation_input_div" style={{marginRight: "20px"}}>
                            <label className="reservation_label"  style={{marginLeft:"10px"}}>Number of Adults</label>
                            <input
                                name="numberOfAdults"
                                placeholder="0"
                                className="reservation_input"
                                style={{width:"180px"}}
                                type="number"
                                defaultValue={0}
                            />
                        </div>

                    </div>

                    <div style={{display:"flex"}}>

                        <div className="reservation_input_div"  style={{marginRight:"100px"}}>
                            <label className="reservation_label">Physical Address</label>
                            <input
                                name="physicalAddress"
                                placeholder="Physical Address"
                                className="reservation_input"
                                style={{height:"60px"}}
                                type="text"
                            />
                        </div>

                        <div className="reservation_input_div">
                            <label className="reservation_label"  style={{marginLeft:"10px"}}>Number of Children</label>
                            <input
                                name="numberOfChildren"
                                placeholder="0"
                                className="reservation_input"
                                style={{width:"180px"}}
                                type="number"
                                defaultValue={0}
                                />
                        </div>

                    </div>
                    
                    <div style={{display:"flex"}}>

                        <div className="reservation_input_div"  style={{marginRight:"100px"}}>
                            <label className="reservation_label">Special Requests</label>
                            <input
                                name="specialRequests"
                                type="text"
                                className="reservation_input"
                                style={{height:"60px"}}
                                placeholder="Special Requests"
                            />
                        </div>

                        <div className="reservation_input_div" style={{marginRight: "20px"}}>
                            <label className="reservation_label"  style={{marginLeft:"10px"}}>Arrival Date</label>
                            <input
                                name="arrivalDate"
                                placeholder="dd/mm/yyyy"
                                className="reservation_input"
                                style={{width:"180px"}}
                                type="date"
                            />
                        </div>

                        <div className="reservation_input_div" style={{marginRight: "20px"}}>
                            <label className="reservation_label"  style={{marginLeft:"10px"}}>Arrival Time</label>
                            <input
                                name="arrivalTime"
                                placeholder="hh:mm"
                                className="reservation_input"
                                style={{width:"180px"}}
                                type="time"
                            />
                        </div>

                    </div>
                    
                    <div style={{display:"flex", marginLeft:"400px"}}>
                        <div className="reservation_input_div" style={{marginRight: "20px"}}>
                            <label className="reservation_label"  style={{marginLeft:"10px"}}>Departure Date</label>
                            <input
                                name="departureDate"
                                placeholder="dd/mm/yyyy"
                                className="reservation_input"
                                style={{width:"180px"}}
                                type="date"
                            />
                        </div>

                        <div className="reservation_input_div" style={{marginRight: "20px"}}>
                            <label className="reservation_label"  style={{marginLeft:"10px"}}>Departure Time</label>
                            <input
                                name="departureTime"
                                placeholder="hh:mm"
                                className="reservation_input"
                                style={{width:"180px"}}
                                type="time"
                            />
                        </div>
                    </div>

                </div>

                <div className="suite_image_div">
                                <svg width= "400px" height="600px" className="suite_image" xmlns="http://www.w3.org/2000/svg">
                                    <image href={single_suite_1} height="550px" width= "400px" />
                                </svg> 
                </div>

            </div>

            <div>
                
            </div>

        <div className="reserve_room_button_div" style={{marginLeft:"800px"}}>
            <button
                name="Reserve_Room"
                type="button"
                className="reserve_room_button"
                onClick={completeReservation}
            >
            <p className="reserve_button_text">Reserve Room</p> 
            </button>
        </div>

        </div>
    )
};

export default ReservationForm;