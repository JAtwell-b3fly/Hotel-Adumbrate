import React from "react";
import { Link } from "react-router-dom";

const ReservationList = () => {
    return(
        <div>
            <div className="reservation_list_box">
                <div className="reservationlist">

                    <ul style={{display:"table"}}>
                        <li style={{display:"table-cell"}}>Hotel Suite</li>
                        <li style={{display:"table-cell"}}>Room Number</li>
                        <li style={{display:"table-cell"}}>From</li>
                        <li style={{display:"table-cell"}}>Till</li>
                        <li style={{display:"table-cell"}}>Number of Days</li>
                        <li style={{display:"table-cell"}}>Full name</li>
                    </ul>

                </div>
            </div>

        </div>
    )
};

export default ReservationList;