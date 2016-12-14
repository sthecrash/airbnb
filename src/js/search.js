var cargar = function(){
	if (navigator.geolocation) { 
        navigator.geolocation.getCurrentPosition(mostrarMapa, error);
    }
}

$(document).ready(cargar);

var mostrarMapa = function(position){
	
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    var latlon = new google.maps.LatLng(lat, lon);
    firstPosition = latlon;
	
	var myOptions = {
		center:latlon,zoom:3,
		zoom: 12,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		mapTypeControl: false,
		navigationControlOptions: {
			style: google.maps.NavigationControlStyle.SMALL
		}
	};
	var map = new google.maps.Map(document.getElementById("map"), myOptions);

	//*autocomplete*//
	var input =  document.getElementById("search");

	var autocomplete = new google.maps.places.Autocomplete(input);
	  autocomplete.bindTo('bounds', map);

	  var marker = new google.maps.Marker({
		map: map,
		anchorPoint: new google.maps.Point(0, -29)
	});

	  autocomplete.addListener('place_changed', function() {
		marker.setVisible(false);
		var place = autocomplete.getPlace();
		if (!place.geometry) {
		  window.alert("No se encontraron resultados");
		  return;
		}
		if (place.geometry.viewport) {
		  map.fitBounds(place.geometry.viewport);
		} else {
		  map.setCenter(place.geometry.location);
		  map.setZoom(17); 
		}
		marker.setIcon(({
		  url: place.icon,
		  size: new google.maps.Size(71, 71),
		  origin: new google.maps.Point(0, 0),
		  anchor: new google.maps.Point(17, 34),
		  scaledSize: new google.maps.Size(35, 35)
		}));
		marker.setPosition(place.geometry.location);
		marker.setVisible(true);
	});
}

var error = function (error) {
     console.log(error);
};