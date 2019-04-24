import React from "react";
import dotenv from 'dotenv';
import { compose, withProps, withStateHandlers } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker} from "react-google-maps";
import MapMarker from './MapMarker';

dotenv.config();

const EventsMapComponent = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '400px' }} />,
    mapElement: <div style={{ height: '100%' }} />,
  }),
  withScriptjs,
  withGoogleMap)((props) =>
  <GoogleMap
    zoom={14}
    center={{ lat: props.currentLat, lng: props.currentLng }}
  >
    {props.events.map((event, index) => (
      Boolean(event.location.latitude) && Boolean(event.location.longitude) ?
      <MapMarker
        index={index}
        event={event}
        location={{lat: event.location.latitude, lng: event.location.longitude}}
      />
       : null
    ))}
  </GoogleMap>
);

export default EventsMapComponent;
