import React from "react";
import styles from './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import EventsMapView from './EventsMapView';
import EventsList from './EventsList';
import EventDetails from './EventDetails';
import Autosuggest from './AutocompleteKeywords';

import logo from './img/EventLoopLogo.png';
import avatar1 from './img/christine.png';

function App() {
  return (
    <Router>
      <img class="logo" src={logo} alt="Logo"/>
      <div >
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
        <h2>The team</h2>
        <img class="avatar" src={avatar1} />

        <h3>Contact Us</h3>
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
  updateEventsOnMap(events) {
    this.setState({
      events,
    });
  }

  render () {
    return (

      <div class="body-background">

        <div className="grid-container">
        <EventsList updateMap={this.updateEventsOnMap} />
        <EventsMapView
          events={this.state.events}
          zoom={14} 
        />
        </div>
        <h2>Filter Events based on your Interests</h2>
        <Autosuggest />
        <Route
          exact
          path={this.props.match.path}
        />
      </div>
    );
  }
}

export default App;
