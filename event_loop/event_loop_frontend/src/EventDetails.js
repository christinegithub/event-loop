import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import CardHeader from '@material-ui/core/CardHeader';

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: 'cover',
  },
};

export default class EventDetails extends React.Component {
  constructor(props) {
    super(props);
    console.log(props.match.params.id);
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
        long: undefined
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
            long: data.location.longitude
          },
          isLoading: false,
        })
    )
    .catch(error => this.setState({ error, isLoading: false }));
  }

  render() {
    console.log(this.state.event);
    const EventRender = (props) => {
    return(
        <div>
            { props.id ? (
              <Card style={{maxWidth: 640}}>
                <CardMedia
                  component="img"
                  alt= {props.title}
                  className={{objectFit: 'cover'}}
                  height="360"
                  image={props.image_url}
                />
                   <CardContent>
                     <Typography variant="title" color="textPrimary">
                       <b>{props.title}</b>

                     </Typography>
                     <Typography variant="subtitle1" color="Blue">
                       <b>Starting</b> : {props.start_date}
                     </Typography>
                     <Typography variant="subtitle1" color="textBlue">
                       <b>Ending: </b>{props.end_date}
                     </Typography>
                     <Typography variant="subtitle1" color="black">
                       <b>Address</b>: {props.address + "," + props.city}
                     </Typography>
                     <Typography variant="subtitle1" color="black">
                       <b>Venue :</b> {props.venue}
                     </Typography>

                      <Typography component="p">
                        <b>Description</b>: {props.description}
                      </Typography>
                    </CardContent>

                    <CardActions>
                    </CardActions>
                </Card>
            ) : null}
        </div>
    )
}
    return EventRender(this.state.event);
  }
}
