import React, { Component } from "react";
import { Link } from "react-router-dom";


function truncateString(str, num) {
  if (str.length > num) {
    return str.slice(0, num) + "...";
  } else {
   return str;
  }
}

class EventsDate extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>

        <ol class="events-list">

        {this.props.events.map(event => (

          <li class="each-event">
            <div key={event.id}>
            <h2>{event.title}</h2>
            <p>{truncateString(event.description, 200)}</p>
            <p>Start Time: {event.start_time}</p>
            <p>End Time: {event.end_time}</p>
            <p><Link to={`events/${event.id}`}>See Details</Link></p>
            </div>
          </li>

        ))}
        </ol>


      </div>

    );
  }
}
// change <Link to={`events/${event.id}`}>See Details</Link> to blogtoid
export default EventsDate;
