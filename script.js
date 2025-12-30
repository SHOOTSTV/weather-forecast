// ============================================
// DOM ELEMENTS
// ============================================
const DOM = {
  cityInput: document.getElementById("city"),
  searchButton: document.getElementById("search"),
  weatherDiv: document.getElementById("weather"),
};

// ============================================
// API CALL
// ============================================
async function getWeather(city) {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&include=current&key=P3K5AV89BBWNGRMNDW9R3MZV4&contentType=json`
    );
    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }
    const data = await response.json();
    const processedData = processApiData(data);

    console.log(processedData);
    displayWeather(processedData);
  } catch (error) {
    console.error("Error occurred :", error.message);
  }
}

// ============================================
// DATA PROCESSING
// ============================================
function processApiData(apiData) {
  return {
    address: apiData.address,
    temp: apiData.currentConditions.temp,
    feelslike: apiData.currentConditions.feelslike,
    conditions: apiData.currentConditions.conditions,
  };
}

// ============================================
// UI RENDERING
// ============================================
function displayWeather(weatherData) {
  DOM.weatherDiv.innerHTML = `
    <h2>${weatherData.address}</h2>
    <p>Temperature: ${weatherData.temp}°C</p>
    <p>Feels like: ${weatherData.feelslike}°C</p>
    <p>Conditions: ${weatherData.conditions}</p>
  `;
}

function displayLoading() {
  DOM.weatherDiv.innerHTML = `<p>Loading...</p>`;
}

// ============================================
// EVENT HANDLERS
// ============================================
DOM.searchButton.addEventListener("click", (event) => {
  event.preventDefault();
  const city = DOM.cityInput.value.trim();
  if (city === "") {
    alert("Please enter a city name");
    return;
  }
  getWeather(city);
});

// ============================================
// INITIALIZATION
// ============================================
function init() {
  displayLoading();
  getWeather("London");
}

init();
