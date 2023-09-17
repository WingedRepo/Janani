let map;
let service;
let infowindow;
let userLocation;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -33.867, lng: 151.206},
        zoom: 15
    });

    infowindow = new google.maps.InfoWindow();

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            userLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            map.setCenter(userLocation);
            searchHospitals(userLocation);
        }, function() {
            handleLocationError(true, infowindow, map.getCenter());
        });
    } else {
        handleLocationError(false, infowindow, map.getCenter());
    }
}

function searchHospitals(location) {
    const request = {
        location: location,
        radius: '20000',
        type: ['hospital']
    };

    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);
}

function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        results.forEach((place, index) => {
            createMarker(place);
            getPlaceDetails(place, index);
        });
    }
}

function getPlaceDetails(place, index) {
    service.getDetails({placeId: place.place_id}, (details, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            const distance = google.maps.geometry.spherical.computeDistanceBetween(userLocation, details.geometry.location) / 1000;
            addToTable(details, index + 1, distance.toFixed(2));
        }
    });
}

function addToTable(details, index, distance) {
    const table = document.getElementById('hospitals-table').getElementsByTagName('tbody')[0];
    
    let row = document.createElement('tr');
    
    let cell1 = document.createElement('td');
    cell1.innerText = index;
    row.appendChild(cell1);
    
    let cell2 = document.createElement('td');
    cell2.innerText = details.name;
    row.appendChild(cell2);
    
    let cell3 = document.createElement('td');
    cell3.innerText = details.formatted_address;
    row.appendChild(cell3);
    
    let cell4 = document.createElement('td');
    cell4.innerText = details.formatted_phone_number || 'N/A';
    row.appendChild(cell4);
    
    let cell5 = document.createElement('td');
    cell5.innerText = distance;
    row.appendChild(cell5);
    
    table.appendChild(row);
}

function createMarker(place) {
    const marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
            'Address: ' + place.vicinity + '</div>');
        infowindow.open(map, this);
    });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}
