function onGeoOk(position) {
    const lat = position.coords.latitude;
    const log = position.coords.longitude;
    const apiKey = "2e5c2fc7829dbc55c5e0679446c42b82";
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${log}&appid=${apiKey}&units=metric`;
    fetch(url)
        .then(function (response) { return response.json() })
        .then(function (data) {
            const weather = document.querySelector("#weather span:first-child")
            const city = document.querySelector("#weather span:last-child")
            city.innerText = data.name;
            weather.innerText = `${data.weather[0].main} / ${data.main.temp}°C`;
            console.log("print weather");
        });
}

function onGeoError() {
    console.log("날씨 정보를 조회할 수 없습니다.");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);