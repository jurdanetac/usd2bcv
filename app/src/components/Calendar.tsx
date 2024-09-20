import Calendar from "react-calendar";
// default calendar css
import "react-calendar/dist/Calendar.css";

const CalendarComponent = ({ date, setDate }) => {
  return (
    <div>
      <Calendar onChange={setDate} value={date} />
    </div>
  );
};

export default CalendarComponent;
