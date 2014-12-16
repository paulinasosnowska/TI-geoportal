var isInAddMarkerMode = false;
var isInAddAnnotationMode = false;
var map;
var markers = L.layerGroup();
var popups = L.layerGroup();

window.onload = function() {
	map = L.map('map');
	revertRange();
	map.closePopupOnClick = false;
	L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
		attribution : '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);

var ksztalt;
$('#okrag').click(function(){
	ksztalt = "okrag";
	});


	map.on('click', onMapClick);
	function onMapClick(e) {
		if (isInAddMarkerMode) {
			var marker = L.marker([51.6185992, 15.3239936]);
			// marker.bindPopup(e.latlng.toString()).openPopup();
			marker.setLatLng(e.latlng);
			markers.addLayer(marker);
			markers.addTo(map);
			isInAddMarkerMode = false;
		}
		if (ksztalt == "okrag"){
		circle = new L.circle(e.latlng, document.getElementById('promien').value, {
    	color: 'yellow',
    	fillColor: 'blue',
    	fillOpacity: 0.5
		});
		map.addLayer(circle);
		}
		if (isInAddAnnotationMode) {
			console.log("Adding annotation at: " + e.latlng);
			var annotationText = prompt("Podaj tekst notatki do wybranego miejsca: ");

			var popup = L.popup();
			popup.keepInView = true;
			popup.closeOnClick = false;
			popup.autoPan = false;
			popup.setLatLng(e.latlng).setContent(annotationText);
			popup.addTo(popups);
			popups.addTo(map);

			isInAddAnnotationMode = false;
		}
	}

};
$('#ortofotoAdd').click(function() {

	var orto = L.tileLayer.wms('http://mapy.geoportal.gov.pl/wss/service/img/guest/ORTO/MapServer/WMSServer', {
	    format: 'img/png',
	    transparent: true,
	    layers: 'Raster',
	}).addTo(map);
	wmslist.push(orto);
});
$('#budynkiAdd').click(function() {

	var budynki = L.tileLayer.wms('http://mapy.geoportal.gov.pl/wss/service/pub/guest/G2_BDOT_BUD_2010/MapServer/WMSServer', {
	    format: 'img/png',
	    transparent: true,
	    layers: '5',
	}).addTo(map);
	wmslist.push(budynki);

});

$('#wmsRemove').click(function() {
	for (var i=0;i<wmslist.length;i++) {
			map.removeLayer(wmslist[i]);
		}
});

function removeMarker() {
	markers.clearLayers();
}

function removeAnnotation() {
	popups.clearLayers();
}

	
function revertRange() {
	console.log("Revert range!");
	map.setView([51.6185992, 15.3239936], 14);
}
