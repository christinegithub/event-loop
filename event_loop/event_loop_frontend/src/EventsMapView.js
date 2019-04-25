import React from "react";
import EventsMapComponent from './EventsMapComponent';

class EventsMapView extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentLat: 43.6532,
      currentLng: -79.3832,
    }
  }

  componentDidMount() {
    this.setMyLocation();
  }

  componentDidUpdate(prevProps, prevState) {
  if (this.state.currentLat !== prevState.currentLat && this.state.currentLng !== prevState.currentLng) {
    console.log('Current location found!');
    console.log('New current lat: ', this.state.currentLat);
    console.log('New currnet lng: ', this.state.currentLng);
  }
}

  setMyLocation() {
    if (!this.props.isDetailMap) {
      navigator.geolocation.getCurrentPosition(position => {
        this.setState(
          {currentLat: position.coords.latitude, currentLng: position.coords.longitude}
        );
        },
        error => console.log(error)
      );
    } else {
      this.setState(
        {
          currentLat: Boolean(this.props.events[0].location.latitude) ? this.props.events[0].location.latitude : 43.6532,
          currentLng: Boolean(this.props.events[0].location.longitude) ? this.props.events[0].location.longitude : -79.3832
        }
      );
    }
  }

  render() {
    return (
      <EventsMapComponent
        isMarkerShown={this.state.isMarkerShown}
        onMarkerClick={this.handleMarkerClick}
        currentLat={this.state.currentLat}
        currentLng={this.state.currentLng}
        events={this.props.events}
        zoom={this.props.zoom}
      />
    )
  }
}

export default EventsMapView;
