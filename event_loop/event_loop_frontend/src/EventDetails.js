import React from 'react';

export default class EventDetails extends React.Component {
  constructor(props) {
    super(props);
    console.log(props.match.params.id);
    this.state = {
      error: null,
      isLoaded: false,
      event: {}
    };
  }

  componentDidMount() {
    this.fetchDetails(this.props.match.params.id);
  }

  fetchDetails(id) {
    fetch('https://www.blogto.com/api/v2/events/' + id + "/")
    .then(response => response.json())
    .then( data => this.setState({
          event: data,
          isLoading: false,
        })
    )
    .catch(error => this.setState({ error, isLoading: false }));
  }

  render() {
    console.log(this.state.event);
    return (
       <div id="layout-content" className="layout-content-wrapper">
         <div className="event-title">{ this.state.event.title }</div>
         <div className="event-description">{ this.state.event.description }</div>
         <div className="event-address">{ this.state.event.address }</div>
       </div>
    );
  }
}
