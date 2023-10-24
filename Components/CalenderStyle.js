import styled from "styled-components";
import Calendar from "react-calendar";

export const StyledCalendar = styled(Calendar)`
  background: rgb(26, 18, 11, 0.5);
  color: white;
  width:25rem;
  height: 18.1rem;
  border-radius: 2.5rem;
  font-family: 'Cinzel', serif;
  border: none;
  box-shadow: 0.1rem 0rem 0rem 0.1rem  rgb(60, 42, 33,0.2);

  .react-calendar__tile--active {
    background-color: rgb(26, 18, 11);
    color: white;
    border-radius: 2.5rem;
    font-weight: bold;

  .react-calendar__navigation button {
    min-width: 44px;
    background: none;
  }

  .react-calendar button:enabled:hover {
    cursor: pointer;
    border-radius: 2.5rem;
  }

  .react-calendar__tile--now {
    background: #E5E5CB;
    border-radius: 2.5rem;
  }

  .react-calendar__tile--now:enabled:hover,
.react-calendar__tile--now:enabled:focus {
  background: #E5E5CB;
  border-radius: 2.5rem;
}

.react-calendar__tile--hasActive {
  background: #E5E5CB;
}

.react-calendar__tile--hasActive:enabled:hover,
.react-calendar__tile--hasActive:enabled:focus {
  background: #E5E5CB;
}
`;
