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

document.addEventListener('DOMContentLoaded', () => {

});
