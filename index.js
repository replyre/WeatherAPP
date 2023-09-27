const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error = document.querySelector(".not-found");
const toggle = document.querySelector(".toggle");
const currentLocation = document.querySelector(".current-search");
const loading = document.querySelector(".loading");

toggle.style.display = "none";

loading.style.display = "none";
let temp;
search.addEventListener("click", () => {
  loading.style.display = "block";
  container.style.height = "200px";
  const APIkey = `9dbddeca46450dec085850e97ca3c807`;
  const city = document.querySelector(".search-box input").value;
  if (city === "") {
    return;
  }

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}`
  )
    .then((res) => res.json())
    .then((json) => {
      if (json.cod === "404") {
        container.style.height = "500px";
        weatherBox.style.display = "none";
        weatherDetails.style.display = "none";
        toggle.style.display = "none";
        error.style.display = "block";
        const currentBox = document.querySelector(".current-location");
        currentBox.style.display = "flex";
        error.classList.add("fade-in");
        loading.style.display = "none";
        return;
      }

      const currentBox = document.querySelector(".current-location");
      currentBox.style.display = "none";

      error.style.display = "none";
      error.classList.remove("fade-in");
      const image = document.querySelector(".weather-box img");
      const temperature = document.querySelector(".weather-box .temperature");
      const description = document.querySelector(".weather-box .description");
      const humidity = document.querySelector(
        ".weather-details .humidity span"
      );
      const wind = document.querySelector(".weather-details .wind span");

      switch (json.weather[0].main) {
        case "Clear":
          image.src = "./images/clear.png";
          break;
        case "Rain":
          image.src = "./images/rain.png";
          break;
        case "Mist":
          image.src = "./images/mist.png";
          break;
        case "Clouds":
          image.src = "./images/cloud.png";
          break;
        case "Snow":
          image.src = "./images/snow.png";
          break;
        case "Haze":
          image.src = "./images/haze.png";
          break;
        default:
          image.src = "";
      }
      temp = parseInt(json.main.temp - 273.15);
      const check = document.querySelector(".switch input");
      if (check.checked) {
        temperature.innerHTML = `${parseInt((temp * 9) / 5 + 32)}<span>°F`;
      } else {
        temperature.innerHTML = `${parseInt(temp)}<span>°C`;
      }
      description.innerHTML = `${json.weather[0].description}`;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${parseInt(json.wind.speed)}km/h`;
      weatherBox.style.display = "";
      weatherDetails.style.display = "";
      weatherBox.classList.add("fade-in");
      weatherDetails.classList.add("fade-in");
      container.style.height = "650px";
      toggle.style.display = "";
      toggle.classList.add("fade-in");
      loading.style.display = "none";
    });
});

toggle.addEventListener("change", () => {
  const check = document.querySelector(".switch input");

  const temperature = document.querySelector(".weather-box .temperature");
  if (check.checked) {
    temperature.innerHTML = `${parseInt((temp * 9) / 5 + 32)}<span>°F`;
  } else {
    temperature.innerHTML = `${parseInt(temp)}<span>°C`;
  }
});

currentLocation.addEventListener("click", () => {
  loading.style.display = "block";
  container.style.height = "200px";
  error.style.display = "none";
  error.classList.remove("fade-in");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let long = position.coords.longitude;
      document.querySelector(".search-box input").value = "";
      const currentBox = document.querySelector(".current-location");
      currentBox.style.display = "none";

      const APIkey = `9dbddeca46450dec085850e97ca3c807`;
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${APIkey}`;
      fetch(apiUrl)
        .then((res) => res.json())
        .then((json) => {
          if (json.cod === "404") {
            container.style.height = "500px";
            weatherBox.style.display = "none";
            weatherDetails.style.display = "none";
            toggle.style.display = "none";
            error.style.display = "block";
            error.classList.add("fade-in");
            loading.style.display = "none";

            return;
          }

          error.style.display = "none";
          error.classList.remove("fade-in");
          const image = document.querySelector(".weather-box img");
          const temperature = document.querySelector(
            ".weather-box .temperature"
          );
          const description = document.querySelector(
            ".weather-box .description"
          );
          const humidity = document.querySelector(
            ".weather-details .humidity span"
          );
          const wind = document.querySelector(".weather-details .wind span");

          switch (json.weather[0].main) {
            case "Clear":
              image.src = "./images/clear.png";
              break;
            case "Rain":
              image.src = "./images/rain.png";
              break;
            case "Mist":
              image.src = "./images/mist.png";
              break;
            case "Clouds":
              image.src = "./images/cloud.png";
              break;
            case "Snow":
              image.src = "./images/snow.png";
              break;
            case "Haze":
              image.src = "./images/haze.png";
              break;
            default:
              image.src = "";
          }
          temp = parseInt(json.main.temp - 273.15);
          const check = document.querySelector(".switch input");
          if (check.checked) {
            temperature.innerHTML = `${parseInt((temp * 9) / 5 + 32)}<span>°F`;
          } else {
            temperature.innerHTML = `${parseInt(temp)}<span>°C`;
          }
          description.innerHTML = `${json.weather[0].description}`;
          humidity.innerHTML = `${json.main.humidity}%`;
          wind.innerHTML = `${parseInt(json.wind.speed)}km/h`;
          weatherBox.style.display = "";
          weatherDetails.style.display = "";
          weatherBox.classList.add("fade-in");
          weatherDetails.classList.add("fade-in");
          container.style.height = "650px";
          toggle.style.display = "";
          toggle.classList.add("fade-in");
          loading.style.display = "none";
        });
    });
  } else {
    console.log("current location is unavaiable");
  }
});
