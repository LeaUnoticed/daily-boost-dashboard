const weatherIcon = document.getElementById("weather-icon");
const temp = document.getElementById("temp");
const dateEl = document.getElementById("date");

const API_KEY = fetch(`/api/weather?city=Tokyo`);

const weatherIcons = {
  Clear: "sun.png",
  Cloudy: "cloud.png",
  Overcast: "cloud.png",
  PartlyCloudy: "cloud.png",
  Rain: "rain.png",
  Snow: "snow.png",
  Drizzle: "drizzle.png",
  Thunderstorm: "storm.png",
  Mist: "mist.png",
  Fog: "fog.png",
  Night: "moon.png",
};

export async function fetchWeather(city = "Tokyo") {
  try {
    const res = await fetch(`http://localhost:3001/api/weather?city=${city}`);
    const data = await res.json();

    const condition = data.current.condition.text;
    const isNight = data.current.is_day === 0;

    let iconKey = "Clear";
    if (condition.includes("Cloud")) iconKey = "Cloudy";
    else if (condition.includes("Rain")) iconKey = "Rain";
    else if (condition.includes("Snow")) iconKey = "Snow";
    else if (condition.includes("Mist") || condition.includes("Fog")) iconKey = "Fog";
    else if (condition.includes("Drizzle")) iconKey = "Drizzle";
    else if (condition.includes("Thunder")) iconKey = "Thunderstorm";

    const iconFile = isNight && weatherIcons["Night"]
      ? weatherIcons["Night"]
      : weatherIcons[iconKey] || "sun.png";

    weatherIcon.src = `assets/img/${iconFile}`;
    temp.textContent = `${Math.round(data.current.temp_c)}°`;
    dateEl.textContent = new Date(data.location.localtime).toLocaleDateString("fr-FR");

  } catch (err) {
    console.error("Erreur météo :", err);
  }
}
