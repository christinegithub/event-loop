import React from "react";
import styles from './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import EventsMap from './EventsMap';
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
      <EventsList />
      <Pagination />
      <EventsMap />
      <h2>Filter Events based on your Interests</h2>
      <Autosuggest />

      <Route
        exact
        path={match.path}

        render={() => <h3>Please select a event.</h3>}

      />
    </div>
  );
}

export default App;
