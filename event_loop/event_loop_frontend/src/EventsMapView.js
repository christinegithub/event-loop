import React from "react";
import EventsMapComponent from './EventsMapComponent';

class EventsMapView extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isMarkerShown: false,
      currentLat: 43.6532,
      currentLng: -79.3832,
    }
  }

  componentDidMount() {
    this.delayedShowMarker();
    this.setMyLocation();
  }

  componentDidUpdate(prevProps, prevState) {
  if (this.state.currentLat !== prevState.currentLat && this.state.currentLng !== prevState.currentLng) {
    console.log('New current lat: ', this.state.currentLat);
    console.log('New currnet lng: ', this.state.currentLng);
  }
}

  setMyLocation() {
    navigator.geolocation.getCurrentPosition(position => {
      this.setState(
        {currentLat: position.coords.latitude, currentLng: position.coords.longitude}
      );
      },
      error => console.log(error)
    );
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true })
    }, 500)
  }

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false })
    this.delayedShowMarker()
  }

  render() {
    return (
      <EventsMapComponent
        isMarkerShown={this.state.isMarkerShown}
        onMarkerClick={this.handleMarkerClick}
        currentLat={this.state.currentLat}
        currentLng={this.state.currentLng}
      />
    )
  }
}

export default EventsMapView;
