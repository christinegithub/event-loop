// global variables to be accessed inside functions related to the home map
let hoemMap, geocoder, infoWindow;

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
