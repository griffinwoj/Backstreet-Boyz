
// more trials

  const corsHeaders = {
    "Access-Control-Allow-Origin": "https://your-website-domain.com",
    "Access-Control-Allow-Methods": "GET",
    "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
    "Access-Control-Max-Age": "3600"
  };
  
  const corsUrl = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=";
  const googleMapsApiKey = 'AIzaSyAaqlOLHQvJj6oZnB8CPCgLvWLZttkeZjc';
  const trailApiKey = 'fc6aecdb0mshaa821d0dd2c6c0ap1f7de4jsncf7d761a6010';
  
  navigator.geolocation.getCurrentPosition(position => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
  
    fetch(`${corsUrl}${latitude},${longitude}&radius=500&type=cafe&keyword=coffee&key=${googleMapsApiKey}`)
      .then(response => response.json())
      .then(data => {
        const coffeeShop = data.results[0];
        const coffeeShopName = coffeeShop.name;
        const coffeeShopAddress = coffeeShop.vicinity;
  
        const coffeeShopElement = document.createElement('div');
        coffeeShopElement.innerHTML = `Nearest coffee shop: ${coffeeShopName} (${coffeeShopAddress})`;
        document.body.appendChild(coffeeShopElement);
      });
  
    fetch(`https://www.hikingproject.com/data/get-trails?lat=${latitude}&lon=${longitude}&maxDistance=10&key=${trailApiKey}`)
      .then(response => response.json())
      .then(data => {
        const hikingTrail = data.trails[0];
        const hikingTrailName = hikingTrail.name;
        const hikingTrailLocation = hikingTrail.location;
        const hikingTrailLength = hikingTrail.length;
  
        const hikingTrailElement = document.createElement('div');
        hikingTrailElement.innerHTML = `Nearest hiking trail: ${hikingTrailName} (${hikingTrailLocation}, ${hikingTrailLength} miles)`;
        document.body.appendChild(hikingTrailElement);
      });
  
    const map = new google.maps.Map(document.getElementById("map"));
    const infoWindow = new google.maps.InfoWindow();
    const locationButton = document.createElement("button");
  });
  
  function initMap() {
    const map = new google.maps.Map(document.getElementById("map"));
    const infoWindow = new google.maps.InfoWindow();
    const locationButton = document.createElement("button");
    locationButton.textContent = "Pan to Current Location";
    locationButton.classList.add("custom-map-control-button");
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
    locationButton.addEventListener("click", () => {
      // Try HTML5 geolocation.
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            infoWindow.setPosition(pos);
            infoWindow.setContent("Location found.");
            infoWindow.open(map);
            map.setCenter(pos);
          },
          () => {
            handleLocationError(true, infoWindow, map.getCenter());
          }
        );
      } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
      }
    });
  }
  google.maps.event.addDomListener(window, 'load', initMap);