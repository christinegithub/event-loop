import React, { Component } from "react";
import ReactDOM from "react-dom";


function truncateString(str, num) {
  if (str.length > num) {
    return str.slice(0, num) + "...";
  } else {
   return str;
  }
}

class EventsList extends Component {
  constructor() {
    super();
    this.state = {
      events: []
    };
  }


  async componentDidMount() {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/');
      const events = await response.json();
      this.setState({
        events
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div>
        <h3>What's happening today?</h3>
        <ol class="events-list">

        {this.state.events.map(event => (

          <li class="each-event">
            <div key={event.id}>
            <h1>{event.title}</h1>
            <p>{truncateString(event.description, 200)}</p>
            <p>Date: {event.date}</p>
            <p>Start Time: {event.start_time}</p>
            <p>End Time: {event.end_time}</p>
            <p><a href={`events/`+ event.id}> See Details</a></p>

            </div>
          </li>
        ))}
        </ol>
        <ul class="pagination"></ul>

      </div>
    );
  }
}

ReactDOM.render(<EventsList />, document.getElementById('root'));

export default EventsList;
