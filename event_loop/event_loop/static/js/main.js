

// callback to initialize the map for the home page
function initMap() {
  const mapDiv = document.getElementById('map');
  const toronto = {lat: 43.647189, lng: -79.38702};
  const map = new google.maps.Map(mapDiv, {zoom: 10, center: toronto});
  const geocoder = new google.maps.Geocoder();
  const listOfVenues = ["Gardiner Museum", "1305 Dundas Street West", "Somewhere Variety", "Aga Khan Museum", "Utopia Pop-Up", "Body Mason", "See Scape", "The Theatre Centre", "The Village Healing Centre", "Toronto Centre for the Arts"];
  let i = 0
  let timer = setInterval(() => {
    const venue = listOfVenues[i];
    geocodeVenue(map, geocoder, `${venue}, Toronto`);
    i++;
    if (i >= listOfVenues.length) {
      clearTimeout(timer);
    }
  }, 150)
  // listOfVenues.forEach((venue) => geocodeVenue(map, geocoder, `${venue}, Toronto`));

}

function geocodeVenue(map, geocoder, venue) {
  console.log(venue);
  geocoder.geocode({'address': venue}, function(results, status) {
    console.log(results[0]);
    if (status === 'OK') {
      const marker = new google.maps.Marker({
        map: map,
        position: results[0].geometry.location,
        title: 'Hello'
      });
      marker.addListener('click', toggleBounce);
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

function toggleBounce() {
  if (this.getAnimation() !== null) {
    this.setAnimation(null);
  } else {
    this.setAnimation(google.maps.Animation.BOUNCE);
  }
}

function truncateString(str, num) {
  if (str.length > num) {
    return str.slice(0, num) + "...";
  } else {
   return str;
  }
}

document.addEventListener('DOMContentLoaded', () => {

});
  // Populate events
  // var eventList = document.querySelector('#infinite-list');
  //
  // let json_events = {}
  // // get /events
  //   // data.events
  // axios.get('/events?date=2019-04-04')
  //     .then(function (response) {
  //       // handle success
  //       json_events = response.data
  //
  //       json_events.forEach(function (event) {
  //         var each_event = document.createElement('li');
  //         each_event.className = "each-event";
  //
  //         each_event.innerHTML = `
  //           <p>${ event.title }</p>
  //           <p>Start Time: ${ event.start_time }</p>
  //           <p>End Time: ${ event.end_time }</p>
  //           <p>${ truncateString(event.description, 200) } </p>
  //           <p><a href="{% url 'event_show' id=event.pk %}"> See Details</a></p>
  //           `
  //           eventList.appendChild(each_event);
  //       })
  //
  //       console.log(response);
  //     })
  //     .catch(function (error) {
  //       // handle error
  //       console.log(error);
  //     })

  // Inifinite scrollbar
  // Add 10 events.
  // var nextItem = 1;
  // var loadMore = function() {
  //   for (var i = 0; i < 10; i++) {
  //     var each_event = document.createElement('li');
  //     each_event.className = "each-event";
  //     each_event.innerHTML = `
  //       <p>${ event.title }</p>
  //       <p>Start Time: ${ event.start_time }</p>
  //       <p>End Time: ${ event.end_time }</p>
  //       <p>${ truncateString(event.description, 100) } </p>
  //       `
  //       eventList.appendChild(each_event);
  //   }
  // }
  //
  // // Detect when scrolled to bottom.
  // eventList.addEventListener('scroll', function() {
  //   if (eventList.scrollTop + eventList.clientHeight >= eventList.scrollHeight) {
  //     loadMore();
  //   }
  // });
  //
  // // Initially load some events.
  // loadMore();

});
