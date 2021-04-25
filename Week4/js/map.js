// Global variables
let map;
let lat = 0;
let lon = 0;
let zl = 3;
// path to csv data
let path = "data/[activism, identity, race] LA Times Photos (California, 1950-90) - la-times-photo-archive.csv";
// global variables
let markers = L.featureGroup();

// initialize
$( document ).ready(function() {
    createMap(lat,lon,zl);
	readCSV(path);
});

// create the map
function createMap(lat,lon,zl){
	map = L.map('map').setView([lat,lon], zl);

	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);
}

// function to read csv data
function readCSV(path){
	Papa.parse(path, {
		header: true,
		download: true,
		complete: function(data) {
			console.log(data);
			
			// map the data
			mapCSV(data);

		}
	});
}

// Create custom map icons
var Icon = L.icon({
	iconUrl: 'http://simpleicon.com/wp-content/uploads/camera.png',

	iconSize: [20.70]
})


function mapCSV(data){

	// loop through each entry
	data.data.forEach(function(item,index){
		// create a marker
		let marker = L.marker([item.latitude,item.longitude], {icon: Icon})
		.on('mouseover',function(){
			this.bindPopup(`<h3>${item.Caption}</h3> <img src ='${item.imageurl}' width=80% />`).openPopup()
		})

		$('.sidebar').append(`${item.Caption}<br><img src="${item.imageurl}" onClick="zoomToImage(${index})", >`)
		
		// add marker to featuregroup
		markers.addLayer(marker)
	})

	// add featuregroup to map
	markers.addTo(map)

	// center map on Los Angeles
	map.setView([34.0522,-118.2437], 10)
}

function zoomToImage(index){
	map.setZoom(18);
	map.panTo(markers.getLayers()[index]._latlng);
	// open the popup
	markers.getLayers()[index].openPopup();
}

