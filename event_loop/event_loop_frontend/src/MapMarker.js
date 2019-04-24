import React, { Component } from "react";
import { Marker, InfoWindow } from "react-google-maps";

class MapMarker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    }
    this.onToggleOpen = this.onToggleOpen.bind(this);
  }

  onToggleOpen() {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  }

  render() {
    return (
      <Marker
        key={this.props.index}
        position={this.props.location}
        onMouseOver={this.onToggleOpen}
        onMouseOut={this.onToggleOpen}
      >
        {this.state.isOpen &&
          <InfoWindow
          onCloseClick={this.onToggleOpen}
          defaultOptions={{ disableAutoPan: true }}
          >
  			 <h4>{this.props.event.title}</h4>
  		 </InfoWindow>
        }
      </Marker>
    )
  }
}

export default MapMarker;
