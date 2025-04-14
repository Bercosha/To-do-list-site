import React, {useState, useEffect} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './CalendarDisplay.css';


const CustomDateDisplay = React.forwardRef(({ value, onClick }, ref) => (
  <div className="date-display" onClick={onClick} ref={ref}>
    <img src="../images/calendar-icon.svg" alt="calendar icon" className="top-bar__icon" />
    <p className="date-display__text">{value}</p>
  </div>
));

const CalendarDisplay = () => {
  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    const popperElement = document.querySelector(".react-datepicker-popper");
    if (popperElement) {
      popperElement.style.marginRight = "0";
    }
  }, [startDate]);

  return (
    <DatePicker
    selected={startDate}
    onChange={(date) => setStartDate(date)}
    customInput={<CustomDateDisplay/>}
    dateFormat="dd MMMM yyyy"
    

    />
  ) 
}

export default CalendarDisplay;