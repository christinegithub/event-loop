import React, { Component } from "react";
import ReactDOM from "react-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import EventsPagination from './EventsPagination';
import EventsDate from './EventsDate';
import moment from 'moment';


function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function formatDate(date){
    return moment(date).format("YYYY-MM-DD");
}


class EventsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      divisible_events: [],
      dated_events: [],
      activePage: 1,
      startDate: new Date()
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  getEventsForPage(events, pageNumber) {
    return events.slice(((pageNumber - 1) * 10), (pageNumber * 10));
  }

  handlePageChange(pageNumber) {
    const events = this.getEventsForPage(this.state.dated_events, pageNumber)

    this.setState({
      divisible_events: events,
      activePage: pageNumber
    });
  }

  handleDateChange(date) {
     const events = this.state.events.filter(event => event.date === formatDate(new Date(date)));
     const pageNumber = 1
     const divisible_events = this.getEventsForPage(events, pageNumber)

     this.setState({
       dated_events: events,
       startDate: date,
       divisible_events,
       activePage: pageNumber
     });
   }


  async componentDidMount(pageNumber) {
    try {

      const response = await fetch('http://127.0.0.1:8000/api/');
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
          events={this.state.divisible_events}
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
