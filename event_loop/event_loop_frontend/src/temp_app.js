// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
//
// function App() {
//   return (
//     <Router>
//       <div>
//         <ul>
//           <li>
//             <Link to="/">Home</Link>
//           </li>
//           <li>
//             <Link to="/about">About</Link>
//           </li>
//         </ul>
//
//         <hr />
//
//         <Route exact path="/" component={Home} />
//         <Route path="/about" component={About} />
//         <Route path="/events/:id" component={Event} />
//       </div>
//     </Router>
//   );
// }
//
// function Event({ match }) {
//   return (
//     <div>
//       <h3>Event: {match.params.id}</h3>
//     </div>
//   );
// }
//
// function About() {
//   return (
//     <div>
//       <h2>About</h2>
//     </div>
//   );
// }
//
//
// function Home({ match }) {
//   return (
//     <div>
//       <h2>Topics</h2>
//       <ul>
//         <li>
//           <Link to={`events/1`}>Event #1</Link>
//         </li>
//       </ul>
//       </div>
//     )
//

//       <Route
//         exact
//         path={match.path}
//         render={() => <h3>Please select a topic.</h3>}
//       />
//     // </div>
//   // );
// }
//
// function Topic({ match }) {
//   return (
//     <div>
//       <h3>{match.params.topicId}</h3>
//     </div>
//   );
// }
//
// export default App;


import React, { Component } from "react";
import ReactDOM from "react-dom";


function truncateString(str, num) {
  if (str.length > num) {
    return str.slice(0, num) + "...";
  } else {
   return str;
  }
}

class App extends Component {

  state = {
    events: []
  };

  handlePageChange(pageNumber) {
    console.log(`active page is $(pageNumber)`);
    this.setState({activePage: pageNumber});
  }

  async componentDidMount() {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/');
      const events = await response.json();
      this.setState({
        events
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div>
        {this.state.events.map(event => (
          <div key={event.id}>
          <h1>{event.title}</h1>
          <p>{truncateString(event.description, 200)}</p>
          <p>Date: {event.date}</p>
          <p>Start Time: {event.start_time}</p>
          <p>End Time: {event.end_time}</p>
          <p><a href="{% url 'event_show' id=event.pk %}"> See Details</a></p>
          </div>
        ))}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

export default App;
