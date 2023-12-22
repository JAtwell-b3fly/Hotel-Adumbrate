import {React, useState} from "react";
//import Calender from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { StyledCalendar } from "./CalenderStyle";

const ReservationCalender = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleDateChange = (date) => {
        setSelectedDate(date);
    }

    return(
        <div className="reservation_calender">
            
            <StyledCalendar onChange={handleDateChange} value={selectedDate} />
        </div>
    )
};

export default ReservationCalender;