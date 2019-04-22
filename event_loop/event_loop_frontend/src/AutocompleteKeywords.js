import React from 'react';
import Autosuggest from 'react-autosuggest';
import Axios from 'axios';

const interests = [];

const axios = require('axios');
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
      suggestions: []
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

  render() {
    const { value, suggestions } = this.state;

    const inputProps = {
      placeholder: 'Input an interest',
      value,
      onChange: this.onChange
    };

    // Finally, render it!
    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    );
  }
}

export default Example;