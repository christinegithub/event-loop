import React from "react";
import styles from './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import EventsMapView from './EventsMapView';
import EventsList from './EventsList';
import EventDetails from './EventDetails';
import Autosuggest from './AutocompleteKeywords'

function App() {
  return (
    <Router>
      <div>
        <ul className="navbar">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>

        <hr />

        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/events/:id" component={EventDetails} />
      </div>
    </Router>
  );
}

class About extends React.Component {
  constructor(props) {
    super(props);
  }
  render () {
    return (
      <div>
        <h2>About</h2>
      </div>
    );
  }
}


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
    };
    this.updateEventsOnMap = this.updateEventsOnMap.bind(this);
  }

  async componentDidMount () {
    const events_response = await fetch('http://127.0.0.1:8000/api/events/');
    let events = await events_response.json();
    events = events.slice(0, 10);
    this.setState({
      events,
    });
  }

  updateEventsOnMap(events) {
    this.setState({
      events,
    });
  }

  render () {
    return (
      <div>
        <h2>Events</h2>
        <ul>
          <li>
            <Link to={`events/134280`}>Event #1</Link>
          </li>
        </ul>
        <div className="grid-container">
        <EventsList updateMap={this.updateEventsOnMap} />
        <EventsMapView events={this.state.events} />
        </div>
        <h2 className="autosuggest-title">Filter Events based on your Interests</h2>
        <Autosuggest />
        <footer>
        <ul className="footer-list">
        <li>Created by:</li>
        <li>Christine Lee</li>
        <li>Farjana Nipa</li>
        <li>Anton Moiseev</li>
        <li>Myles Bennett</li>
        </ul>
        <p>©Bitmaker 2019</p></footer>
        <Route
          exact
          path={this.props.match.path}
        />
      </div>
    );
  }
}

export default App;
