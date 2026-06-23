const API_KEY = "763f25504bbbefd1c4ad7c3b3f042a3d";
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const city = document.getElementById("city");
const temp = document.getElementById("temp");
const condition = document.getElementById("condition");
const humidity = document.getElementById("humidity");
const icon = document.getElementById("icon");

async function getWeather(cityName) {
    const cachedData =
    JSON.parse(localStorage.getItem(cityName));

if (cachedData) {

    const now = Date.now();

    if (now - cachedData.time < 600000) {

        const data = cachedData.weather;

        city.textContent = data.name;
        temp.textContent =
            `Temperature: ${data.main.temp} °C`;

        condition.textContent =
            `Condition: ${data.weather[0].main}`;

        humidity.textContent =
            `Humidity: ${data.main.humidity}%`;

        icon.src =
            `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

        console.log("Loaded from cache");

        return;
    }
}
    try {

        const url =
            `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;

            console.log("Searching:", cityName);

        const response = await fetch(url);

console.log(response);

if (!response.ok) {
    throw new Error("City not found");
}

        const data = await response.json();
        localStorage.setItem(
    cityName,
    JSON.stringify({
        weather: data,
        time: Date.now()
    })
);
    console.log("saved to cache");

        if (data.weather[0].main === "Rain") {
    document.body.style.background = "#5d6d7e";
}
else if (data.weather[0].main === "Clear") {
    document.body.style.background = "#f7dc6f";
}
else {
    document.body.style.background = "#d6dbdf";
}

        city.textContent = data.name;
       temp.textContent =
    `Temperature: ${data.main.temp} °C`;

        condition.textContent =
            `Condition: ${data.weather[0].main}`;

        humidity.textContent =
            `Humidity: ${data.main.humidity}%`;

        icon.src =
            `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    }
    catch (error) {

    console.log(error);

    city.textContent = "";
    temp.textContent = "";
    condition.textContent = "";
    humidity.textContent = "";

    errorMessage.textContent =
    "❌ City not found. Please try again.";
}
}

searchBtn.addEventListener("click", function () {

    const cityName = cityInput.value.trim();

    if (cityName === "") {
        alert("Please enter a city name");
        return;
    }

    getWeather(cityName);
});
if (navigator.geolocation) {

    navigator.geolocation.getCurrentPosition(
        async function(position) {

            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            const url =
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

            const response = await fetch(url);
            const data = await response.json();
            errorMessage.textContent = "";

            city.textContent = data.name;
            temp.textContent =
                `Temperature: ${data.main.temp} °C`;

            condition.textContent =
                `Condition: ${data.weather[0].main}`;

            humidity.textContent =
                `Humidity: ${data.main.humidity}%`;

            icon.src =
                `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        },
        function() {
            console.log("Location permission denied");
        }
    );
}
 