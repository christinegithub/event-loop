import React from 'react';
import Autosuggest from 'react-autosuggest';
import axios from 'axios';
import { Link } from "react-router-dom";

const interests = [];

axios.get('http://localhost:8000/api/keywords')
    .then(function (response) {
        console.log(response)
        for (let i = 0; i < response.data.length; i++) {
            let new_word = response.data[i].word;
            interests.push({word: new_word})
        }
    })
    .catch(function(error) {
        console.log(error);
    });

const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : interests.filter(lang =>
    lang.word.toLowerCase().slice(0, inputLength) === inputValue
  );
};

const getSuggestionValue = suggestion => suggestion.word;

const renderSuggestion = suggestion => (
  <div>
    {suggestion.word}
  </div>
);

class Example extends React.Component {
  constructor() {
    super();

    this.state = {
      value: '',
      suggestions: [],
      events: []
    };
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  handleClick = () => {
    axios.get('http://localhost:8000/api/keywords/' + this.state.value + '/')
    .then((response) => {
      this.setState({
        events: response.data.events
      })
    }).catch(function(error) {
      console.log(error);
  });
  }


  render() {
    const { value, suggestions } = this.state;

    const inputProps = {
      placeholder: 'Input an interest',
      value,
      onChange: this.onChange
    };

    return (
      <React.Fragment>
        <div className="input-wrapper">
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
          />
          <button className="suggest-button" onClick={this.handleClick}>Submit</button>
        </div>

        <ul>
        {this.state.events.map(event => (

          <li class="each-event">
            <div key={event.id}>
            <h1>{event.title}</h1>
            <p>Date: {event.date}</p>
            <p>Start Time: {event.start_time}</p>
            <p>End Time: {event.end_time}</p>
            <p><Link to={`events/${event.id}`}>See Details</Link></p>
            </div>
          </li>

          ))}
        </ul>
        
      </React.Fragment>
    );
  }
}

export default Example;
