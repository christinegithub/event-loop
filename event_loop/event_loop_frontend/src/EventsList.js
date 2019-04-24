import React, { Component } from "react";
import ReactDOM from "react-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import EventsPagination from './EventsPagination';
import EventsDate from './EventsDate';




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
      divisble_events: [],
      dated_events: [],
      activePage: 1,
      startDate: new Date()
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }


  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    const events = this.state.dated_events.slice(((pageNumber - 1) * 10), (pageNumber * 10));
    this.setState({
      divisble_events: events,
      activePage: pageNumber
    });
    this.props.updateMap(events);
  }

  handleDateChange(date) {
    const events = this.state.events.filter(event => true);
    // console.log(Date(this.state.events[0].date));
    // console.log(typeof(date));
    // console.log(events);
     this.setState({
       dated_events: events,
       startDate: date
     });
     const divisble_events = this.handlePageChange(1);
   }


  async componentDidMount(pageNumber) {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/events/');
      const events = await response.json();
      this.setState({
        events,
      });

      this.handleDateChange(this.state.startDate);
    } catch (error) {
      console.log(error);
    }
  }



  render() {
    return (
      <div>
        <div>
          Choose Date: <DatePicker
          selected={this.state.startDate}
          onChange={this.handleDateChange}
          withPortal
          minDate={new Date()}
          maxDate={addDays(new Date(), 7)}
          placeholderText="Click to select date"
          shouldCloseOnSelect={true}
          todayButton={"Today"}
          dateFormat="yyyy-MM-dd"
          />
        </div>

        <EventsDate
          events={this.state.divisble_events}
        />

        <div>
          <EventsPagination
            activePage={this.state.activePage}
            totalItemsCount={this.state.events.length}
            handlePageChange={this.handlePageChange}
          />
        </div>


      </div>

    );
  }
}


ReactDOM.render(<EventsList />, document.getElementById('root'));

export default EventsList;
