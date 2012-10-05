$(document).ready(function() {
	
	function getURLParameter(name) {
		return decodeURI(
			(RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
		);
	}
	
	var map;
	
	if (navigator.geolocation) {
		if(getURLParameter('currLoc') == 'yes'){
			navigator.geolocation.getCurrentPosition( 
		 
				function (position) { 
					mapServiceProvider(position.coords.latitude,position.coords.longitude);
		 
				}, 
				function (error){
					switch(error.code){
						case error.TIMEOUT:
							alert ('Timeout');
							break;
						case error.POSITION_UNAVAILABLE:
							alert ('Position unavailable');
							break;
						case error.PERMISSION_DENIED:
							alert ('Permission denied');
							break;
						case error.UNKNOWN_ERROR:
							alert ('Unknown error');
							break;
					}
				}
			);
		}else{
			retrieveCoordinates();	
		}
	}else{
		// finish the error checking if the client is not compliant with the spec
	}
	
	
	
	
	function mapServiceProvider(latitude,longitude){
		//if (window.location.querystring['serviceProvider']=='Yahoo'){
			//mapThisYahoo(latitude,longitude);
		//}else{
			mapThisGoogle(latitude,longitude);
		//}
	}
	
	
	
	
	function retrieveCoordinates(){
		var suburb = getURLParameter('suburb');
		var city = getURLParameter('city');
		var zipcode = getURLParameter('zipcode');
		
		var address;
		
		if(suburb != 'null'){
			address = suburb;
		}
		if(city != 'null'){
			address = address + ' ' + city;
		}
		if(zipcode != 'null'){
			address = address + ' ' + zipcode;
		}
		var geocoder= new google.maps.Geocoder();
    	geocoder.geocode( { 'address': address}, function(results, status) {
      		if (status == google.maps.GeocoderStatus.OK) {
        		mapServiceProvider(results[0].geometry.location.Xa, results[0].geometry.location.Ya);

      		} else {
        		alert("Geocode was not successful for the following reason: " + status);
      		}
    	});
	}
	
	
	
	
	function mapThisGoogle(latitude,longitude){
		
		var mapOptions = {
			center: new google.maps.LatLng(latitude,longitude),
			zoom: 7,
          	mapTypeId: google.maps.MapTypeId.ROADMAP
		};
        map = new google.maps.Map(document.getElementById("map"),
            mapOptions);
		
		/*var mapCenter = new google.maps.LatLng(latitude,longitude);
		map = new google.maps.Map(document.getElementById("map"));
		console.log(map);
		map.setCenter(mapCenter, 15);*/
		//map.addOverlay(new google.maps.Marker(mapCenter));
	 
		// Start up a new reverse geocoder for addresses?
		//geocoder = new google.maps.Geocoder();
		//geocoder.getLocations(latitude+','+longitude, addAddressToMap);
		
		addMarker(latitude,longitude,'current location');
		
		google.maps.event.addListener(map, 'bounds_changed', function() {
			
			
						/* RETURN MAP MILES */
			
			/*var bounds = map.getBounds();
			var center = bounds.getCenter();
			var ne = bounds.getNorthEast();
			 
			 // r = radius of the earth in statute miles
			var r = 3963.0;  
			
			// Convert lat or lng from decimal degrees into radians (divide by 57.2958)
			var lat1 = center.lat() / 57.2958; 
			var lon1 = center.lng() / 57.2958;
			var lat2 = ne.lat() / 57.2958;
			var lon2 = ne.lng() / 57.2958;
			
			// distance = circle radius from center to Northeast corner of bounds
			var dis = r * Math.acos(Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1));
			
			console.log(dis);*/
		  });

		//var center = bounds.getCenter();
		//var ne = bounds.getNorthEast();
		
		//http://stackoverflow.com/questions/5162950/google-maps-api-v3-set-zoom-level-to-show-a-given-radius
		//http://stackoverflow.com/questions/3525670/radius-of-viewable-region-in-google-maps-v3
	}
	
	
	
	
	
	
	/* ########## MARKERS ########## */
	
	// I add a marker to the map using the given latitude
// and longitude location.
function addMarker(latitude,longitude,label){
	// Create the marker - this will automatically place it
	// on the existing Google map (that we pass-in).
	var marker = new google.maps.Marker({
		map: map,
		position: new google.maps.LatLng(
			latitude,
			longitude
		),
		title: (label || ""),
		clickable: true
	});
	
	var radius = parseInt(getURLParameter('radius')) * 1609.3;
	
	var circle = new google.maps.Circle({
		map: map,
		radius: radius,    // 10 miles in metres
		//strokeColor: '#AA0000'
		fillOpacity:0,
		//strokeWeight:1,
		strokeOpacity:0
	});
	circle.bindTo('center', marker, 'position');
	
	map.fitBounds(circle.getBounds());
	
	google.maps.event.addListenerOnce(map, 'bounds_changed', function(event) {
        if (this.getZoom()){
            this.setZoom(map.getZoom()+1);
        }
	});
	
	//var ne = bounds.getNorthEast(); // LatLng of the north-east corner
	//var sw = bounds.getSouthWest();
	/*console.log(circle.getBounds());
	
	google.maps.event.addListener(map, 'bounds_changed', function() {
		var bounds = map.getBounds();
		var ne = bounds.getNorthEast(); // LatLng of the north-east corner
		var sw = bounds.getSouthWest();
		var southWest = new google.maps.LatLng(sw.Xa,sw.Ya);
  		var northEast = new google.maps.LatLng(ne.Xa,ne.Ya);
		var newBounds = new google.maps.LatLngBounds(southWest,northEast);
		map.fitBounds(bounds);
		console.log(newBounds);
	});*/
	
	
	
	//var bounds = new google.maps.LatLngBounds(new google.maps.LatLng(latitude-radius,longitude-radius),new google.maps.LatLng(latitude+radius,longitude+radius));
	//map.fitBounds(bounds);
	
	var infowindow = new google.maps.InfoWindow({
		content:"Request for a 4th<span class='right'>09/14/12 - 8:15</span><br />Space for a 4th person to join our golf game this Saturday. Tee off at 08:15 ...",
		maxWidth: 200
		});
	google.maps.event.addListener(marker, 'click', function() {
    	infowindow.open(map, marker);
  	});
	 
	// Return the new marker reference.
	return( marker );
}
 
 
// I update the marker's position and label.
function updateMarker( marker, latitude, longitude, label ){
	// Update the position.
	marker.setPosition(
		new google.maps.LatLng(
			latitude,
			longitude
		)
	);
 
// Update the title if it was provided.
	if(label){
		marker.setTitle(label);
	}
}




	













});