import React from "react";
import dotenv from 'dotenv';
import { compose, withProps } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";

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
    defaultZoom={14}
    center={{ lat: props.currentLat, lng: props.currentLng }}
  >
    {props.isMarkerShown &&
      props.events.map((event, index) => (
        <Marker
        position={{ lat: event.lat, lng: event.lng }}
        onClick={props.onMarkerClick}
        key={index}
        />
      ))}
    }
  </GoogleMap>
);

export default EventsMapComponent;
