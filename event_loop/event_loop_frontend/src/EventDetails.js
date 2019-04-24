import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import EventsMapView from './EventsMapView';



class EventDetails extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      error: null,
      isLoaded: false,
      event: {
        id: undefined,
        title: undefined,
        description: undefined,
        address: undefined,
        city: undefined,
        start_date: undefined,
        end_date: undefined,
        venue: undefined,
        image_url: undefined,
        lat: undefined,
        long: undefined,

      }
    };
  }

  componentDidMount() {
    this.fetchDetails(this.props.match.params.id);

  }

  fetchDetails(id) {
    fetch('https://www.blogto.com/api/v2/events/' + id + "/")
    .then(response => response.json())
    .then( data => this.setState({
          event: {
            id: data.id,
            title: data.title,
            description: data.description_stripped,
            address: data.address,
            city: data.city,
            start_date: data.start_date_time,
            end_date: data.end_date_time,
            venue: data.venue_name,
            image_url: data.image_url + "?width=1280&height=720",
            lat: data.location.latitude,
            long: data.location.longitude,
            eventLocations: [{ lat: 43.6475, lng: -79.38702 },{ lat: 43.656804, lng: -79.409055 }],
          },
          isLoading: false,
        })
    )
    .catch(error => this.setState({ error, isLoading: false }));
  }

  render() {
    console.log(this.state.event);
    console.log(this.state.eventLocations);
    const EventRender = (props) => {
    return(
        <div>
            { props.id ? (
              <Card style={{width: '50%', 'padding-left': '25%' }}>

                <CardMedia
                  component="img"
                  height="360"     // as an example I am modifying width and height
                  width="640"
                  style={{background: 'cover'}}
                  image={props.image_url}
                />
                   <CardContent>
                     <Typography variant="title" color="textPrimary">
                       <b>{props.title}</b>
                     </Typography>

                     <Typography variant="subtitle1" color="primary">
                       <b>Starting</b> : {props.start_date}
                     </Typography>

                     <Typography variant="subtitle1" color="primary">
                       <b>Ending: </b>{props.end_date}
                     </Typography>

                     <Typography variant="subtitle1" color="textPrimary">
                       <b>Address</b>: {props.address + "," + props.city}
                     </Typography>

                     <Typography variant="subtitle1" color="textPrimary">
                       <b>Venue :</b> {props.venue}
                     </Typography>

                      <Typography component="p" color="textSecondary">
                        <i>Description</i>: <i>{props.description}</i>
                      </Typography>

                    </CardContent>
                    <EventsMapView eventLocations={props.eventLocations} />


                </Card>
            ) : null}
        </div>
    )
}
    return EventRender(this.state.event);
  }
}

export default EventDetails;
