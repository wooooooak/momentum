const API_KEY = '747f850fb68fed7505f17da6bef57a82';
const COORDS = 'coords';

const weather = document.querySelector('.js-weather');

function getWeather(lat, lon) {
	fetch(
		`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
	)
		.then((res) => {
			console.log(res);
			return res.json();
		})
		.then((json) => {
			const temperature = json.main.temp;
			const place = json.name;
			weather.innerHTML = `${temperature} C @ ${place}`;
		});
}

function saveCoords(coordsObj) {
	localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
	const latitude = position.coords.latitude;
	const longitude = position.coords.longitude;
	const coordsObj = {
		latitude,
		longitude
	};
	saveCoords(coordsObj);
	getWeather(latitude, longitude);
}

function handleGeoError() {
	console.log('error');
}

function askForCoords() {
	navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
	const loadedCords = localStorage.getItem(COORDS);
	if (loadedCords === null) {
		askForCoords();
	} else {
		const parseCoords = JSON.parse(loadedCords);
		getWeather(parseCoords.latitude, parseCoords.longitude);
	}
}

function init() {
	loadCoords();
}

init();
