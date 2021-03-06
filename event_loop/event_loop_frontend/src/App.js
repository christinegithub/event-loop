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
import avatar3 from './img/Anton.png';
import avatar4 from './img/myles.png';

function App() {
  return (
    <Router>
      <div className="site-nav">
        <ul className="site-nav-list">
          <li className="site-nav-item">
            <img class="logo" src={logo} alt="Logo"/>
          </li>
          <li className="site-nav-item">
            <h1 className="site-name">Event Loop</h1>
          </li>
          <li className="site-nav-item link">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="site-nav-item link">
            <Link className="nav-link" to="/about">About</Link>
          </li>
        </ul>

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
      <div className="contact-us-container">
      <h2><u>Contact Us</u></h2>

      <div class="contact-us">

      <div class="contact">
        <img class="avatar-image" src={avatar1} />
        <h3>Christine Lee</h3>
        <p>christine13@gmail.com</p>
        <a href="https://www.linkedin.com/in/christine-lee-">Visit my LinkedIn profile!</a>
      </div>
      <div class="contact">
        <img class="avatar-image" src={avatar2} />
        <h3>Farjana Nipa</h3>
        <p>nipa.farjana04@gmail.com</p>
        <a href="https://www.linkedin.com/in/farjana-yasmin-nipa-6767a0169/">Visit my LinkedIn profile!</a>
      </div>
      <div class="contact">
        <img class="avatar-image" src={avatar3} />
        <h3>Anton Moiseev</h3>
        <p>anton.mois33v@gmail.com</p>
        <a href="https://www.linkedin.com/in/anton-moiseev/">Visit my LinkedIn profile!</a>
      </div>
      <div class="contact">
        <img class="avatar-image" src={avatar4} />
        <h3>Myles Bennett</h3>
        <p>myles.bennett@hotmail.com</p>
        <a href="https://www.linkedin.com/in/myles-bennett/">Visit my LinkedIn profile!</a>
      </div>

      </div>
      <footer>©Bitmaker 2019</footer>
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
        <footer>©Bitmaker 2019</footer>
        <Route
          exact
          path={this.props.match.path}
        />
      </div>
    );
  }
}

export default App;
