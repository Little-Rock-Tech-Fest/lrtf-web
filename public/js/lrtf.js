$(document).ready(function() {

	// Check for click events on the navbar burger icon
	$(".navbar-burger").click(function() {

		// Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
		$(".navbar-burger").toggleClass("is-active");
		$(".navbar-menu").toggleClass("is-active");

	});

	var mapOptions = {
		zoom: 16,
		center: new google.maps.LatLng(34.7480943, -92.2725005),
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}
	var map = new google.maps.Map(document.getElementById("is-map"), mapOptions);

});