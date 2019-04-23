import React from "react";
import styles from './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import EventsMapView from './EventsMapView';
import EventsList from './EventsList';
import Pagination from './Pagination';
import EventDetails from './EventDetails';
import Autosuggest from './AutocompleteKeywords'

function App() {
  return (
    <Router>
      <div>
        <ul>
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
      eventLocations: [{ lat: 43.6475, lng: -79.38702 }, { lat: 43.656804, lng: -79.409055 }],
    }
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
        <EventsList />
        <Pagination />
        <EventsMapView eventLocations={this.state.eventLocations} />
        </div>
        <h2>Filter Events based on your Interests</h2>
        <Autosuggest />
        <Route
          exact
          path={this.props.match.path}
          render={() => <h3>Please select an event.</h3>}
        />
      </div>
    );
  }
}

export default App;
