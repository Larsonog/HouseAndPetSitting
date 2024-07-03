function calculateDistance() {
    var userAddress = document.getElementById('user-address').value;
  
    // Geocode the user's address using Nominatim
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(userAddress)}`)
      .then(response => response.json())
      .then(data => {
        if (data && data.length > 0) {
          var userLocation = [data[0].lat, data[0].lon];
  
          // Replace with your latitude and longitude
          var myLocation = [38.673200, -90.368530];
  
          // Calculate the distance using OpenRouteService
          fetch(`https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf6248574fedc11b2d4b5aa2f45a0c7a4846fe&start=${myLocation[1]},${myLocation[0]}&end=${userLocation[1]},${userLocation[0]}`)
            .then(response => response.json())
            .then(data => {
              if (data && data.features && data.features.length > 0) {
                var distanceInMeters = data.features[0].properties.segments[0].distance;
  
                // Convert distance from meters to miles
                var distanceInMiles = distanceInMeters / 1609.34;
  
                // Calculate the cost if distance is more than 10 miles
                var cost = 0;
                if (distanceInMiles > 10) {
                  cost = (distanceInMiles - 10).toFixed(2) * 1;
                }
  
                document.getElementById('result').innerHTML =
                  'Distance: ' + distanceInMiles.toFixed(2) + ' miles<br>' +
                  (cost > 0 ? 'Additional cost: $' + cost.toFixed(2) : 'No additional cost');
              } else {
                alert('Error calculating distance.');
              }
            });
        } else {
          alert('Address not found.');
        }
      })
      .catch(error => alert('Error: ' + error));
  }
  