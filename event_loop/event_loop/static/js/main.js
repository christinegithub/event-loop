// global variables to be accessed inside functions related to the home map
let homeMap, geocoder, infoWindow;

// callback to initialize the map for the home page
function initHomeMap() {
  const mapDiv = document.getElementById('map');
  const toronto = {lat: 43.6532, lng: -79.3832};
  homeMap = new google.maps.Map(mapDiv, {zoom: 10, center: toronto});
  infoWindow = new google.maps.InfoWindow({
    content: "This is your current location."
  });

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      const pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      const currentLocationMarker = new google.maps.Marker({
        position: pos,
        map: homeMap,
        title: 'Current location'
      })
      currentLocationMarker.addListener('click', function() {
        infoWindow.open(homeMap, currentLocationMarker);
      });
      homeMap.setCenter(pos);
      homeMap.setZoom(13);
    }, function() {
      handleLocationError(true, infoWindow, homeMap.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, homeMap.getCenter());
  }

  geocoder = new google.maps.Geocoder();
  // this returns a NodeList
  const venueNodes = document.querySelectorAll('.venue-name');
  // convert the NodeList to an Array
  const venueArray = Array.from(venueNodes);
  console.log(venueArray.slice(0,10));
  const listOfVenues = venueArray.slice(0,10).map(venue => venue.innerText);
  let i = 0
  let timer = setInterval(() => {
    const venue = listOfVenues[i];
    geocodeVenue(`${venue}, Toronto`);
    i++;
    if (i >= listOfVenues.length) {
      clearTimeout(timer);
    }
  }, 150)
}

function geocodeVenue(venue) {
  console.log(venue);
  geocoder.geocode({'address': venue}, function(results, status) {
    console.log(results[0]);
    if (status === 'OK') {
      const marker = new google.maps.Marker({
        map: homeMap,
        position: results[0].geometry.location,
        title: venue
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


function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ? "Error: The Geolocation service failed." : "Error: Your browser doesn't support geolocation.");
  infoWindow.open(homeMap);
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
