import { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { getEvents, clearEvents } from "../actions/eventActions";
import CalendarHeader from "./CalendarHeader";
import Day from "./Day";
import { useDate } from "../hooks/useDate";

const Calendar = ({ events, isAuthenticated }) => {
  const dispatch = useDispatch();
  const [nav, setNav] = useState(0);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getEvents());
    }
    if (!isAuthenticated) {
      dispatch(clearEvents());
    }
  }, [isAuthenticated, dispatch]);

  const { days, dateDisplay } = useDate(events, nav);

  return (
    <div>
      <div id="container">
        <CalendarHeader
          dateDisplay={dateDisplay}
          onBack={() => setNav(nav - 1)}
          onNext={() => setNav(nav + 1)}
        />
        <div id="weekdays">
          <div>Sun</div>
          <div>Mon</div>
          <div>Tues</div>
          <div>Wed</div>
          <div>Thurs</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>
        <div id="calendar">
          {days.map((d, index) => (
            <Day key={index} day={d} />
          ))}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  events: state.event.events,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, null)(Calendar);
