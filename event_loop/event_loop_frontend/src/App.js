import React from "react";
import styles from './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import EventsMapView from './EventsMapView';
import EventsList from './EventsList';
import EventDetails from './EventDetails';
import Autosuggest from './AutocompleteKeywords';

import logo from './img/EventLoopLogo.png';
import avatar1 from './img/christine.png';
import avatar2 from './img/Farjana.png';
import avatar4 from './img/myles.png';

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
        <img class="avatar" src={avatar2} />
        <img class="avatar" src={avatar4} />

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

      <div class="body-background">

        <div className="grid-container">
        <EventsList updateMap={this.updateEventsOnMap} />
        <EventsMapView events={this.state.events} zoom={14} isDetailMap={false} />
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
