import React, { Component } from "react";
import ReactDOM from "react-dom";
import Pagination from "react-js-pagination";
// require("bootstrap/less/bootstrap.less");
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


function truncateString(str, num) {
  if (str.length > num) {
    return str.slice(0, num) + "...";
  } else {
   return str;
  }
}

function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}


class EventsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      activePage: 10,
      startDate: new Date()
    };
    this.componentDidMount = this.componentDidMount.bind(this);
  }


  // handlePageChange(pageNumber) {
  //   console.log(`active page is ${pageNumber}`);
  //   this.setState({activePage: pageNumber});
  // }


  async componentDidMount(pageNumber, date) {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/');
      const events = await response.json();
      console.log(`active page is ${pageNumber}`)
      this.setState({
        events,
        activePage: pageNumber,
        startDate: date
      });
    } catch (error) {
      console.log(error);
    }
  }



  render() {
    return (
      <div>
        Choose Date: <DatePicker
        selected={this.state.startDate}
        onChange={this.handleChange}
        withPortal
        minDate={new Date()}
        maxDate={addDays(new Date(), 7)}
        placeholderText="Click to select a date"
        todayButton={"Today"}
        dateFormat="/MM/dd/yyyy"
      />
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
            <p><a href="{% url 'event_show' id=event.pk %}"> See Details</a></p>
            </div>
          </li>

        ))}
        </ol>
        <div>
          <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={10}
            totalItemsCount={this.state.events.length}
            pageRangeDisplayed={5}
            onChange={this.componentDidMount}
            prevPageText={`Previous`}
            nextPageText={`Next`}
          />
        </div>


      </div>

    );
  }
}


ReactDOM.render(<EventsList />, document.getElementById('root'));

export default EventsList;
