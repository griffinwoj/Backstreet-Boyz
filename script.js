
const googleMapsApiKey = "AIzaSyBEFvyqyp2nPc1iVK1yS7ANAC2qRv1xHbo";
const corsUrl = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=";
const trailApiKey = "2fc6aecdb0mshaa821d0dd2c6c0ap1f7de4jsncf7d761a6010";

const script = document.createElement('script');
script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&callback=initMap`;
script.async = true;

window.initMap = function () {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 37.7749, lng: -122.4194 },
    zoom: 8,
  });
  const infoWindow = new google.maps.InfoWindow();
  const locationButton = document.createElement("button");
  locationButton.textContent = "Pan to Current Location";
  locationButton.classList.add("custom-map-control-button");
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
  locationButton.addEventListener("click", () => {

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
          console.log(pos)
          map.setCenter(pos);
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {

      handleLocationError(false, infoWindow, map.getCenter());
    }
  });
};
getNearestCoffeeShop = () => {
  navigator.geolocation.getCurrentPosition(position => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

  });
}

document.head.appendChild(script);
navigator.geolocation.getCurrentPosition(position => {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  console.log("latitude", latitude)
  console.log("longitude", longitude)
  fetch(`${corsUrl}${latitude},${longitude}&radius=500&type=cafe&keyword=coffee&key=${googleMapsApiKey}`)
    .then(response => response.json())
    .then(data => {
      const coffeeShop = data.results[0];
      const coffeeShopName = coffeeShop.name;
      const coffeeShopAddress = coffeeShop.vicinity;

      const coffeeShopElement = document.createElement('div');
      coffeeShopElement.innerHTML = `Nearest coffee shop: ${coffeeShopName} (${coffeeShopAddress})`;
      console.log(coffeeShopElement)
      document.body.appendChild(coffeeShopElement);
    });


  // yey.
});

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '2fc6aecdb0mshaa821d0dd2c6c0ap1f7de4jsncf7d761a6010',
    'X-RapidAPI-Host': 'trailapi-trailapi.p.rapidapi.com'
  }
};

fetch('https://trailapi-trailapi.p.rapidapi.com/trails/explore/?lat=42.4411136&lon=-82.9128704', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));

  // const closestTrail = data.trails[0];
  // closestTrail.name = closestTrail.name.replace

  const closestTrail = document.querySelector('#trail');
  closestTrail.textContent = data[0];
  const trailName = document.querySelector('#trail-city');
  trailName.textContent = data[0].city;