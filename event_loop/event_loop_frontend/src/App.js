import React from "react";
import styles from './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import EventsMapView from './EventsMapView';
import EventsList from './EventsList';
import Pagination from './Pagination';
import EventDetails from './EventDetails';

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

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

function Home({ match }) {
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
      <EventsMapView />
      </div>
      <Route
        exact
        path={match.path}
        render={() => <h3>Please select an event.</h3>}
      />
    </div>
  );
}

export default App;
