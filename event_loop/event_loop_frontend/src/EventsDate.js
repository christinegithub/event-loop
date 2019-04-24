import React, { Component } from "react";


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
            <h1>{event.title}</h1>
            <p>{truncateString(event.description, 200)}</p>
            <p>Date: {event.date}</p>
            <p>Start Time: {event.start_time}</p>
            <p>End Time: {event.end_time}</p>
            <p><a href="{% url 'event_show' id=event.pk %}"> See Details</a></p>
            </div>
          </li>

        ))}
        </ol>


      </div>

    );
  }
}

export default EventsDate;
