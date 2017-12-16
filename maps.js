var map;
var infowindow;

function initialize() {
    var pyrmont = new google.maps.LatLng(-6.917464, 107.619123);

    map = new google.maps.Map(document.getElementById('map-canvas'), {
        center: pyrmont,
        zoom: 13
    });

    var request = {
        location: pyrmont,
        radius: 5500,
        query: 'astra credit companies'
    };
    infowindow = new google.maps.InfoWindow();
    //var service = new google.maps.places.PlacesService(map);
    //service.nearbySearch(request, callback);

    var service = new google.maps.places.PlacesService(map);
    service.textSearch(request, callback);

}

function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
        }
    }
}

function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
    });
}

google.maps.event.addDomListener(window, 'load', initialize);
