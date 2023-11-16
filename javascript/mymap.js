// Create a Leaflet map with a specified view center and zoom level.
const map = L.map('map').setView([40.6068, 35.9704], 2);

// Add a tile layer (in this case, OpenStreetMap) to the map.
const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Initialize an empty object to store markers.
var markers = {};

// Define a function to add a marker to the map.
function addMarker(lat, lng, imageUrl, popupText) {
  // Create a marker at the specified latitude and longitude.
  const marker = L.marker([lat, lng], { interactive: true }).addTo(map);

  // If there is an image URL provided, create a tooltip with an image and text.
  if (imageUrl) {
    const imageTag = `<img src="${imageUrl}" style="border-radius: 10px; max-width: 100px; max-height: 100px;" />`;
    const popupContent = `<div style="color:#ffffff;">${imageTag}<br>${popupText}</div>`;
    marker.bindTooltip(popupContent, { maxWidth: "none", direction: 'top', offset: [-15, -15] });
  }

  return marker;
}

// Add click event listeners to elements with the class 'country-button'.
document.querySelectorAll('.country-button').forEach(function (button) {
  button.addEventListener('click', function () {
    var coordinates = this.getAttribute('data-coordinates').split(',');
    var lat = parseFloat(coordinates[0]);
    var lng = parseFloat(coordinates[1]);

    if (this.classList.contains('active')) {
      // If the button is active, remove the marker from the map and deactivate the button.
      map.removeLayer(markers[this.innerText]);
      this.classList.remove('active');
    } else {
      // If the button is not active, add a marker to the map and activate the button.
      markers[this.innerText] = addMarker(lat, lng, this.getAttribute('data-image-url'), this.getAttribute('data-popup-text'));
      this.classList.add('active');
    }
  });
});

// Iterate through the markers and set up mouseover and mouseout event handlers for each.
for (var country in markers) {
  (function (country) {
    marker.on("mouseover", function (e) {
      this.openTooltip();
    });
    marker.on("mouseout", function (e) {
      this.closeTooltip();
    });
  })(country);
}

// Initialize a variable to track the toggle state.
var isToggleActive = false;

// Add click event listeners to elements with the class 'toggle-button'.
document.querySelectorAll('.toggle-button').forEach(function (button) {
  button.addEventListener('click', function () {
    isToggleActive = !isToggleActive;

    // Remove all markers from the map.
    for (var country in markers) {
      map.removeLayer(markers[country]);
    }

    // Iterate through 'country-button' elements and either add markers to the map or remove them based on the toggle state.
    document.querySelectorAll('.country-button').forEach(function (countryButton) {
      var coordinates = countryButton.getAttribute('data-coordinates').split(',');
      var lat = parseFloat(coordinates[0]);
      var lng = parseFloat(coordinates[1]);

      if (isToggleActive) {
        markers[countryButton.innerText] = addMarker(lat, lng, countryButton.getAttribute('data-image-url'), countryButton.getAttribute('data-popup-text'));
        countryButton.classList.add('active');
      } else {
        countryButton.classList.remove('active');
      }
    });

    // Toggle the 'active' class for the button.
    button.classList.toggle('active', isToggleActive);
  });
});
