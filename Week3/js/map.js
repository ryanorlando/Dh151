let data = [
	{
		'title':'Michigan State',
		'description':'Final Score: 86-80 (Overtime). This game went from depressing to incredible in only 20 minutes. Coach gave a great halftime speech that really pushed us to victory. My voice was gone by the end.',
		'lat': 42.701847,
		'lon': -84.482170,
		'url': "https://cloudfront-us-east-1.images.arcpublishing.com/advancelocal/GR4ZAC74NJAAXKPWK3WMZDXROE.jpg"
	},
	{
		'title':'BYU',
		'description':'Final Score: 73-62. We knew we were going to win from the start. We controlled the game, and my briefly recovered voice was once again lost.',
		'lat': 40.2518,
		'lon': -111.6493,
		'url': "https://i.ytimg.com/vi/zYPq5fSw2yU/maxresdefault.jpg"
	},
	{
		'title':'Abilene Christian',
		'description':'Final Score: 67-47. After watching this team upset Texas in the first round, we prepared harder than ever for them. It paid off with a lopsided win, but was anything but easy.',
		'lat': 32.4697,
		'lon': -99.7081,
		'url': "https://www.ocregister.com/wp-content/uploads/2021/03/GettyImages-1308514759.jpg?w=620"
	},
	{
		'title':'Alabama',
		'description':'Final Score: 88-78 (Overtime). After Alabama hit a game tying shot to send it to overtime, I just had more confidence that we would win. I knew we had built up the toughness to not let that beat us.',
		'lat': 33.2140,
		'lon': -87.5391,
		'url': "https://ca-times.brightspotcdn.com/dims4/default/09447b6/2147483647/strip/true/crop/4806x3204+0+0/resize/840x560!/quality/90/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F36%2F00%2F065d61e744b8a87bd598cebd8cf1%2Fncaa-ucla-alabama-basketball-68611.jpg"
	},
	{
		'title':'Michigan',
		'description':'Final Score: 51-49. This was the first game I was nervous that we might lose. Each play felt like a heart attack in slow motion, but we played just hard enough and got just lucky enough to win.',
		'lat': 42.2780,
		'lon': -83.7382, 
		'url': "https://www.gannett-cdn.com/presto/2021/03/31/PDTN/a48771ec-da62-4fce-b065-b32021370d12-AP21090160979267.jpg?crop=4617,2598,x0,y0&width=660&height=372&format=pjpg&auto=webp"
	}
]

let map = L.map('map').setView([0,0], 3);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Create custom map icons

var Icon = L.icon({
	iconUrl: 'https://cdn2.iconfinder.com/data/icons/activity-5/50/1F3C0-basketball-512.png',

	iconSize: [20.70]
})

// before looping the data, create an empty FeatureGroup
let myMarkers = L.featureGroup();


// loop through data
data.forEach(function(item){
	// create marker
	let marker = L.marker([item.lat,item.lon], {icon: Icon}).bindPopup('<h3>'+item.title+'</h3>' +'<p>' + item.description + '</p' + "<br /> <br /> <img src ='" +
	item.url + "' width=80% />")

	// add marker to featuregroup
	myMarkers.addLayer(marker)

	// add data to sidebar with onclick event
	$('.sidebar').append(`<div class="sidebar-item" onclick="flyByID(${item.id})">${item.title}</div>`)
})


// after loop, add the FeatureGroup to map
myMarkers.addTo(map)


// define layers
let layers = {
	"My Markers": myMarkers
}

// add layer control box
L.control.layers(null,layers).addTo(map)


// make the map zoom to the extent of markers
map.fitBounds(myMarkers.getBounds());


// function to fly to a location by a given id number
function flyByIndex(index){
	map.flyTo([data[index].lat,data[index].lon],12)

	// open the popup
	myMarkers.getLayers()[index].openPopup()
}